import { Either } from '@core/entities/either'

import { NotAllowedError } from '../errors/not-allowed'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export type DeleteAnswerUseCaseRequest = {
  answerId: string
  authorId: string
}

export type DeleteAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, null>
