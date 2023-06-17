import { Either } from '@core/entities/either'

import { NotAllowedError } from '../errors/not-allowed'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export type DeleteCommentOnAnswerUseCaseRequest = {
  answerCommentId: string
  authorId: string
}

export type DeleteCommentOnAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, null>
