import { Either } from '@core/entities/either'
import { NotAllowedError } from '@core/errors/not-allowed'
import { ResourceNotFoundError } from '@core/errors/resource-not-found'

export type DeleteQuestionUseCaseRequest = {
  questionId: string
  authorId: string
}

export type DeleteQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, null>
