import { Either } from '@core/entities/either'
import { Question } from '@domains/forum/enterprise/entities/question'

import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export type GetQuestionBySlugUseCaseRequest = {
  slug: string
}

export type GetQuestionBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    question: Question
  }
>
