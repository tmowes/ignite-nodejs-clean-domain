import { AnswerCommentsRepository } from '@domains/forum/application/repositories/answer-comments-repository'

import { DeleteCommentOnAnswerUseCaseRequest, DeleteCommentOnAnswerUseCaseResponse } from './types'

export class DeleteCommentOnAnswerUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    answerCommentId,
    authorId,
  }: DeleteCommentOnAnswerUseCaseRequest): Promise<DeleteCommentOnAnswerUseCaseResponse> {
    const answerComment = await this.answerCommentsRepository.findById(answerCommentId)
    if (!answerComment) {
      throw new Error('Answer comment not found')
    }

    if (authorId !== answerComment.authorId.toString()) {
      throw new Error('Not allowed')
    }

    await this.answerCommentsRepository.delete(answerComment)
  }
}
