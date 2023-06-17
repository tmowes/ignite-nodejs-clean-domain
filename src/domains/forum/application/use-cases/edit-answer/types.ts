import { Either } from '@core/entities/either'
import { Answer } from '@domains/forum/enterprise/entities/answer'

import { NotAllowedError } from '../errors/not-allowed'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export type EditAnswerUseCaseRequest = {
  answerId: string
  authorId: string
  content: string
  attachmentsIds: string[]
}

export type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>
