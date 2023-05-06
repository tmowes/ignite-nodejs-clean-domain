import { AnswerComment } from '@domains/forum/enterprise/entities/answer-comment'

export type CommentOnAnswerUseCaseRequest = {
  answerId: string
  authorId: string
  content: string
}

export type CommentOnAnswerUseCaseResponse = {
  answerComment: AnswerComment
}
