import { AnswerCommentsRepository } from '@domains/forum/application/repositories/answer-comments-repository'
import { left, right } from '@core/entities/either'
import { ResourceNotFoundError } from '@core/errors/resource-not-found'
import { NotAllowedError } from '@core/errors/not-allowed'

import { DeleteCommentOnAnswerUseCaseRequest, DeleteCommentOnAnswerUseCaseResponse } from './types'

export class DeleteCommentOnAnswerUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    answerCommentId,
    authorId,
  }: DeleteCommentOnAnswerUseCaseRequest): Promise<DeleteCommentOnAnswerUseCaseResponse> {
    const answerComment = await this.answerCommentsRepository.findById(answerCommentId)
    if (!answerComment) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answerComment.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.answerCommentsRepository.delete(answerComment)
    return right(null)
  }
}
