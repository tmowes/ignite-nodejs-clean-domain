import { Either } from '@core/entities/either'

import { NotAllowedError } from '../errors/not-allowed'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export type DeleteCommentOnQuestionUseCaseRequest = {
  questionCommentId: string
  authorId: string
}

export type DeleteCommentOnQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>
