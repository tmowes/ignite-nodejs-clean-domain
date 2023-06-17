import { Either } from '@core/entities/either'
import { QuestionComment } from '@domains/forum/enterprise/entities/question-comment'

export type FetchCommentsOnQuestionUseCaseRequest = {
  questionId: string
  page: number
}

export type FetchCommentsOnQuestionUseCaseResponse = Either<
  null,
  {
    questionComments: QuestionComment[]
  }
>
