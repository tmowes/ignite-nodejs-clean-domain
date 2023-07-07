import { Either } from '@core/entities/either'
import { NotAllowedError } from '@core/errors/not-allowed'
import { ResourceNotFoundError } from '@core/errors/resource-not-found'

export type DeleteCommentOnAnswerUseCaseRequest = {
  answerCommentId: string
  authorId: string
}

export type DeleteCommentOnAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, null>
