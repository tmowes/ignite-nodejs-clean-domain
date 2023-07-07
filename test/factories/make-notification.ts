import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { Notification } from '@domains/notification/enterprise/entities/notification'
import { NotificationProps } from '@domains/notification/enterprise/entities/notification/types'
import { faker } from '@faker-js/faker'

export function makeNotification(
  override: Partial<NotificationProps> = {},
  id: UniqueEntityID | undefined = undefined,
) {
  return Notification.create(
    {
      recipientId: new UniqueEntityID(),
      title: faker.lorem.sentence(4),
      content: faker.lorem.sentence(10),
      ...override,
    },
    id,
  )
}
