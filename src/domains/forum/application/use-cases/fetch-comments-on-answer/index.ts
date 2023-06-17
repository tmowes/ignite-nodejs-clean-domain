import { AnswerCommentsRepository } from '@domains/forum/application/repositories/answer-comments-repository'
import { right } from '@core/entities/either'

import { FetchCommentsOnAnswerUseCaseRequest, FetchCommentsOnAnswerUseCaseResponse } from './types'

export class FetchCommentsOnAnswerUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    answerId,
    page,
  }: FetchCommentsOnAnswerUseCaseRequest): Promise<FetchCommentsOnAnswerUseCaseResponse> {
    const answerComments = await this.answerCommentsRepository.findManyByAnswerId(answerId, {
      page,
    })

    return right({ answerComments })
  }
}
