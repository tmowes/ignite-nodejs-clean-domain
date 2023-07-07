import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { AnswersRepository } from '@domains/forum/application/repositories/answers-repository'
import { AnswerCommentsRepository } from '@domains/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@domains/forum/enterprise/entities/answer-comment'
import { left, right } from '@core/entities/either'
import { ResourceNotFoundError } from '@core/errors/resource-not-found'

import { CommentOnAnswerUseCaseRequest, CommentOnAnswerUseCaseResponse } from './types'

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerCommentsRepository: AnswerCommentsRepository,
  ) {}

  async execute({
    answerId,
    authorId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content,
    })

    await this.answerCommentsRepository.create(answerComment)

    return right({ answerComment })
  }
}
