import { UniqueEntityID } from '@core/entities/unique-entity-id'

export type CommentProps = {
  authorId: UniqueEntityID
  content: string
  createdAt: Date
  updatedAt?: Date
}
