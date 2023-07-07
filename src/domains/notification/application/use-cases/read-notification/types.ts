import { Either } from '@core/entities/either'
import { NotAllowedError } from '@core/errors/not-allowed'
import { ResourceNotFoundError } from '@core/errors/resource-not-found'
import { Notification } from '@domains/notification/enterprise/entities/notification'

export type ReadNotificationUseCaseRequest = {
  recipientId: string
  notificationId: string
}

export type ReadNotificationUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { notification: Notification }
>
