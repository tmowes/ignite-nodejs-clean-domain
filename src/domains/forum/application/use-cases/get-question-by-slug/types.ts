import { Question } from '@domains/forum/enterprise/entities/question'

export type GetQuestionBySlugUseCaseRequest = {
  slug: string
}

export type GetQuestionBySlugUseCaseResponse = {
  question: Question
}
