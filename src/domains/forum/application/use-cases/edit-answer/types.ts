import { Answer } from '@domains/forum/enterprise/entities/answer'

export type EditAnswerUseCaseRequest = {
  answerId: string
  authorId: string
  content: string
}

export type EditAnswerUseCaseResponse = {
  answer: Answer
}
