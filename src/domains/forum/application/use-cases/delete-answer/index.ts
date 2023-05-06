import { AnswersRepository } from '@domains/forum/application/repositories/answers-repository'

import { DeleteAnswerUseCaseRequest, DeleteAnswerUseCaseResponse } from './types'

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed')
    }

    await this.answersRepository.delete(answer)
  }
}
