import { QuestionsRepository } from '@domains/forum/application/repositories/questions-repository'

import { FetchRecentQuestionsUseCaseRequest, FetchRecentQuestionsUseCaseResponse } from './types'

export class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    page,
  }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page })

    return { questions }
  }
}
