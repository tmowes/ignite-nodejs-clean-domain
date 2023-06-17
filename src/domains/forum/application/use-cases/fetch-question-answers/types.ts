import { Either } from '@core/entities/either'
import { Answer } from '@domains/forum/enterprise/entities/answer'

export type FetchQuestionAnswersUseCaseRequest = {
  questionId: string
  page: number
}

export type FetchQuestionAnswersUseCaseResponse = Either<
  null,
  {
    answers: Answer[]
  }
>
