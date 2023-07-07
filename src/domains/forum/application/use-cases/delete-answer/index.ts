import { AnswersRepository } from '@domains/forum/application/repositories/answers-repository'
import { left, right } from '@core/entities/either'
import { NotAllowedError } from '@core/errors/not-allowed'
import { ResourceNotFoundError } from '@core/errors/resource-not-found'

import { DeleteAnswerUseCaseRequest, DeleteAnswerUseCaseResponse } from './types'

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.answersRepository.delete(answer)

    return right(null)
  }
}
