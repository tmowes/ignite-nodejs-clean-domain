import { Either } from '@core/entities/either'
import { Question } from '@domains/forum/enterprise/entities/question'

export type FetchRecentQuestionsUseCaseRequest = {
  page: number
}

export type FetchRecentQuestionsUseCaseResponse = Either<
  null,
  {
    questions: Question[]
  }
>
