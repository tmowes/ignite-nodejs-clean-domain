import { right } from '@core/entities/either'
import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { Notification } from '@domains/notification/enterprise/entities/notification'

import { NotificationsRepository } from '../../repositories/notifications-repository'
import { SendNotificationUseCaseRequest, SendNotificationUseCaseResponse } from './types'

export class SendNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(props: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
    const { recipientId, title, content } = props

    const notification = Notification.create({
      recipientId: new UniqueEntityID(recipientId),
      title,
      content,
    })

    await this.notificationsRepository.create(notification)

    return right({ notification })
  }
}
