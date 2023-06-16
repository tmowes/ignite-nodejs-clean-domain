import { UniqueEntityID } from '@core/entities/unique-entity-id'

import { Slug } from '../value-objects/slug'
import { QuestionAttachmentList } from '../question-attachment-list'

export type QuestionProps = {
  authorId: UniqueEntityID
  bestAnswerId?: UniqueEntityID
  title: string
  content: string
  slug: Slug
  attachments: QuestionAttachmentList
  createdAt: Date
  updatedAt?: Date
}
