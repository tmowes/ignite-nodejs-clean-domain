import { Either } from '@core/entities/either'
import { QuestionComment } from '@domains/forum/enterprise/entities/question-comment'

import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export type CommentOnQuestionUseCaseRequest = {
  questionId: string
  authorId: string
  content: string
}

export type CommentOnQuestionUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questionComment: QuestionComment
  }
>
