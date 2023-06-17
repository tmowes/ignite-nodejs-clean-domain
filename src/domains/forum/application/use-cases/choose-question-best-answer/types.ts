import { Question } from '@domains/forum/enterprise/entities/question'
import { Either } from '@core/entities/either'

import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { NotAllowedError } from '../errors/not-allowed'

export type ChooseQuestionBestAnswerUseCaseRequest = {
  authorId: string
  answerId: string
}

export type ChooseQuestionBestAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>
