import { AnswerComment } from '@domains/forum/enterprise/entities/answer-comment'

export type FetchCommentsOnAnswerUseCaseRequest = {
  answerId: string
  page: number
}

export type FetchCommentsOnAnswerUseCaseResponse = {
  answerComments: AnswerComment[]
}
