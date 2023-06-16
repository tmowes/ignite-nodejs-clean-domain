import { Question } from '@domains/forum/enterprise/entities/question'

export type EditQuestionUseCaseRequest = {
  questionId: string
  authorId: string
  title: string
  content: string
  attachmentsIds: string[]
}

export type EditQuestionUseCaseResponse = {
  question: Question
}
