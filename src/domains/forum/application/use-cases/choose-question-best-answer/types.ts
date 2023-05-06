import { Question } from '@domains/forum/enterprise/entities/question'

export type ChooseQuestionBestAnswerUseCaseRequest = {
  authorId: string
  answerId: string
}

export type ChooseQuestionBestAnswerUseCaseResponse = {
  question: Question
}
