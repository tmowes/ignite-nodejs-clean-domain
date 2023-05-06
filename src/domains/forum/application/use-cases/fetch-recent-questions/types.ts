import { Question } from '@domains/forum/enterprise/entities/question'

export type FetchRecentQuestionsUseCaseRequest = {
  page: number
}

export type FetchRecentQuestionsUseCaseResponse = {
  questions: Question[]
}
