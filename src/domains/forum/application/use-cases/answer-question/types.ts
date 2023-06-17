import { Answer } from '@domains/forum/enterprise/entities/answer'

export type AnswerQuestionUseCaseRequest = {
  instructorId: string
  questionId: string
  content: string
  attachmentsIds: string[]
}

export type AnswerQuestionUseCaseResponse = {
  answer: Answer
}
