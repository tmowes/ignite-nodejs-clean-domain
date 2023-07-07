import { Either } from '@core/entities/either'
import { Notification } from '@domains/notification/enterprise/entities/notification'

export type SendNotificationUseCaseRequest = {
  recipientId: string
  title: string
  content: string
}

export type SendNotificationUseCaseResponse = Either<null, { notification: Notification }>
