import { UniqueEntityID } from '@core/entities/unique-entity-id'

import { Slug } from '../value-objects/slug'

export type QuestionProps = {
  authorId: UniqueEntityID
  bestAnswerId?: UniqueEntityID
  title: string
  content: string
  slug: Slug
  createdAt: Date
  updatedAt?: Date
}
