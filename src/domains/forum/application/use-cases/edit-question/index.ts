import { QuestionsRepository } from '@domains/forum/application/repositories/questions-repository'
import { QuestionAttachmentList } from '@domains/forum/enterprise/entities/question-attachment-list'
import { QuestionAttachment } from '@domains/forum/enterprise/entities/question-attachment'
import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { left, right } from '@core/entities/either'
import { NotAllowedError } from '@core/errors/not-allowed'
import { ResourceNotFoundError } from '@core/errors/resource-not-found'

import { QuestionAttachmentsRepository } from '../../repositories/question-attachments-repository'
import { EditQuestionUseCaseRequest, EditQuestionUseCaseResponse } from './types'

export class EditQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionAttachmentsRepository: QuestionAttachmentsRepository,
  ) {}

  async execute({
    questionId,
    authorId,
    content,
    title,
    attachmentsIds,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    const currentQuestionAttachments = await this.questionAttachmentsRepository.findManyByQuestionId(
      questionId,
    )

    const attachments = new QuestionAttachmentList(currentQuestionAttachments)

    const questionAttachments = attachmentsIds.map((attachmentId) =>
      QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        questionId: question.id,
      }),
    )

    attachments.update(questionAttachments)

    const updatedQuestion = Object.assign(question, { content, title, attachments })

    await this.questionsRepository.save(updatedQuestion)

    return right({ question: updatedQuestion })
  }
}
