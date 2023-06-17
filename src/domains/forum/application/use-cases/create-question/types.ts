import { Either } from '@core/entities/either'
import { Question } from '@domains/forum/enterprise/entities/question'

export type CreateQuestionUseCaseRequest = {
  authorId: string
  title: string
  content: string
  attachmentsIds: string[]
}

export type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question
  }
>
