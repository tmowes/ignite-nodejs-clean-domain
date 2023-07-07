import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { QuestionsRepository } from '@domains/forum/application/repositories/questions-repository'
import { QuestionCommentsRepository } from '@domains/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@domains/forum/enterprise/entities/question-comment'
import { left, right } from '@core/entities/either'
import { ResourceNotFoundError } from '@core/errors/resource-not-found'

import { CommentOnQuestionUseCaseRequest, CommentOnQuestionUseCaseResponse } from './types'

export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionCommentsRepository: QuestionCommentsRepository,
  ) {}

  async execute({
    questionId,
    authorId,
    content,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content,
    })

    await this.questionCommentsRepository.create(questionComment)

    return right({ questionComment })
  }
}
