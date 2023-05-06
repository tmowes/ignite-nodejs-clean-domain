import { Question } from '@domains/forum/enterprise/entities/question'

export type CreateQuestionUseCaseRequest = {
  authorId: string
  title: string
  content: string
}

export type CreateQuestionUseCaseResponse = {
  question: Question
}
