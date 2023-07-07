import { Question } from '@domains/forum/enterprise/entities/question'
import { Either } from '@core/entities/either'
import { ResourceNotFoundError } from '@core/errors/resource-not-found'
import { NotAllowedError } from '@core/errors/not-allowed'

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
