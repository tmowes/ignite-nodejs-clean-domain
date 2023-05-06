import { AnswersRepository } from '@domains/forum/application/repositories/answers-repository'

import { FetchQuestionAnswersUseCaseRequest, FetchQuestionAnswersUseCaseResponse } from './types'

export class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(questionId, { page })

    return { answers }
  }
}
