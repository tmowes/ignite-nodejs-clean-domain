import { UniqueEntityID } from '@core/entities/unique-entity-id'

export type AnswerProps = {
  authorId: UniqueEntityID
  questionId: UniqueEntityID
  content: string
  createdAt: Date
  updatedAt?: Date
}
