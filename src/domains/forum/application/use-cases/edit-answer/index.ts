import { AnswersRepository } from '@domains/forum/application/repositories/answers-repository'
import { AnswerAttachmentsRepository } from '@domains/forum/application/repositories/answer-attachments-repository'
import { AnswerAttachmentList } from '@domains/forum/enterprise/entities/answer-attachment-list'
import { AnswerAttachment } from '@domains/forum/enterprise/entities/answer-attachment'
import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { left, right } from '@core/entities/either'
import { NotAllowedError } from '@core/errors/not-allowed'
import { ResourceNotFoundError } from '@core/errors/resource-not-found'

import { EditAnswerUseCaseRequest, EditAnswerUseCaseResponse } from './types'

export class EditAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async execute({
    answerId,
    authorId,
    content,
    attachmentsIds,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    const currentAnswerAttachments = await this.answerAttachmentsRepository.findManyByAnswerId(answerId)

    const attachments = new AnswerAttachmentList(currentAnswerAttachments)

    const answerAttachments = attachmentsIds.map((attachmentId) =>
      AnswerAttachment.create({ attachmentId: new UniqueEntityID(attachmentId), answerId: answer.id }),
    )

    attachments.update(answerAttachments)

    const updatedAnswer = Object.assign(answer, { content, attachments })

    await this.answersRepository.save(updatedAnswer)

    return right({ answer: updatedAnswer })
  }
}
