import { QuestionsRepository } from '@domains/forum/application/repositories/questions-repository'

import { GetQuestionBySlugUseCaseRequest, GetQuestionBySlugUseCaseResponse } from './types'

export class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({ slug }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) {
      throw new Error('Question not found')
    }

    return { question }
  }
}
