import { Either } from '@core/entities/either'
import { Question } from '@domains/forum/enterprise/entities/question'
import { NotAllowedError } from '@core/errors/not-allowed'
import { ResourceNotFoundError } from '@core/errors/resource-not-found'

export type EditQuestionUseCaseRequest = {
  questionId: string
  authorId: string
  title: string
  content: string
  attachmentsIds: string[]
}

export type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>
