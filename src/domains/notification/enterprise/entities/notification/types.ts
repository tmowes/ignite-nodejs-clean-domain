import { UniqueEntityID } from '@core/entities/unique-entity-id'

export type NotificationProps = {
  recipientId: UniqueEntityID
  title: string
  content: string
  readAt?: Date
  createdAt: Date
}
