import { Answer } from '@domains/forum/enterprise/entities/answer'

export type FetchQuestionAnswersUseCaseRequest = {
  questionId: string
  page: number
}

export type FetchQuestionAnswersUseCaseResponse = {
  answers: Answer[]
}
