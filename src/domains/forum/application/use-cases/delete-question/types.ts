import { Either } from '@core/entities/either'

import { NotAllowedError } from '../errors/not-allowed'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export type DeleteQuestionUseCaseRequest = {
  questionId: string
  authorId: string
}

export type DeleteQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, null>
