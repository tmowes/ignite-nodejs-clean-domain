import { Either } from '@core/entities/either'
import { AnswerComment } from '@domains/forum/enterprise/entities/answer-comment'

import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export type CommentOnAnswerUseCaseRequest = {
  answerId: string
  authorId: string
  content: string
}

export type CommentOnAnswerUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    answerComment: AnswerComment
  }
>
