import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { Answer } from '@domains/forum/enterprise/entities/answer'
import { AnswersRepository } from '@domains/forum/application/repositories/answers-repository'
import { AnswerAttachment } from '@domains/forum/enterprise/entities/answer-attachment'
import { AnswerAttachmentList } from '@domains/forum/enterprise/entities/answer-attachment-list'
import { right } from '@core/entities/either'

import { AnswerQuestionUseCaseRequest, AnswerQuestionUseCaseResponse } from './types'

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
    attachmentsIds,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    })

    const answerAttachments = attachmentsIds.map((attachmentId) =>
      AnswerAttachment.create({ attachmentId: new UniqueEntityID(attachmentId), answerId: answer.id }),
    )

    const attachments = new AnswerAttachmentList(answerAttachments)

    const updatedAnswer = Object.assign(answer, { attachments })

    await this.answersRepository.create(updatedAnswer)

    return right({ answer })
  }
}
