import { Either } from '@core/entities/either'
import { NotAllowedError } from '@core/errors/not-allowed'
import { ResourceNotFoundError } from '@core/errors/resource-not-found'

export type DeleteAnswerUseCaseRequest = {
  answerId: string
  authorId: string
}

export type DeleteAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, null>
