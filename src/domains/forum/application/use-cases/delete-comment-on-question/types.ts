import { Either } from '@core/entities/either'
import { NotAllowedError } from '@core/errors/not-allowed'
import { ResourceNotFoundError } from '@core/errors/resource-not-found'

export type DeleteCommentOnQuestionUseCaseRequest = {
  questionCommentId: string
  authorId: string
}

export type DeleteCommentOnQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>
