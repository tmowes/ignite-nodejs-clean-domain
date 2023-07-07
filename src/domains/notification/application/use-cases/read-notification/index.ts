import { left, right } from '@core/entities/either'
import { NotAllowedError } from '@core/errors/not-allowed'
import { ResourceNotFoundError } from '@core/errors/resource-not-found'

import { NotificationsRepository } from '../../repositories/notifications-repository'
import { ReadNotificationUseCaseRequest, ReadNotificationUseCaseResponse } from './types'

export class ReadNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(props: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
    const { notificationId, recipientId } = props

    const notification = await this.notificationsRepository.findById(notificationId)

    if (!notification) {
      return left(new ResourceNotFoundError())
    }

    if (recipientId !== notification.recipientId.toString()) {
      return left(new NotAllowedError())
    }

    notification.read()

    await this.notificationsRepository.save(notification)

    return right({ notification })
  }
}
