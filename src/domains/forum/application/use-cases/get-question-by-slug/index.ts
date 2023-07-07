import { QuestionsRepository } from '@domains/forum/application/repositories/questions-repository'
import { left, right } from '@core/entities/either'
import { ResourceNotFoundError } from '@core/errors/resource-not-found'

import { GetQuestionBySlugUseCaseRequest, GetQuestionBySlugUseCaseResponse } from './types'

export class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({ slug }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    return right({ question })
  }
}
