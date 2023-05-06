import { QuestionCommentsRepository } from '@domains/forum/application/repositories/question-comments-repository'

import { DeleteCommentOnQuestionUseCaseRequest, DeleteCommentOnQuestionUseCaseResponse } from './types'

export class DeleteCommentOnQuestionUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionCommentId,
    authorId,
  }: DeleteCommentOnQuestionUseCaseRequest): Promise<DeleteCommentOnQuestionUseCaseResponse> {
    const questionComment = await this.questionCommentsRepository.findById(questionCommentId)
    if (!questionComment) {
      throw new Error('Question comment not found')
    }

    if (authorId !== questionComment.authorId.toString()) {
      throw new Error('Not allowed')
    }

    await this.questionCommentsRepository.delete(questionComment)
  }
}
