import { QuestionComment } from '@domains/forum/enterprise/entities/question-comment'

export type CommentOnQuestionUseCaseRequest = {
  questionId: string
  authorId: string
  content: string
}

export type CommentOnQuestionUseCaseResponse = {
  questionComment: QuestionComment
}
