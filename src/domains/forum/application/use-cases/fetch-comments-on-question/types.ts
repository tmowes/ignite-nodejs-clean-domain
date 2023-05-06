import { QuestionComment } from '@domains/forum/enterprise/entities/question-comment'

export type FetchCommentsOnQuestionUseCaseRequest = {
  questionId: string
  page: number
}

export type FetchCommentsOnQuestionUseCaseResponse = {
  questionComments: QuestionComment[]
}
