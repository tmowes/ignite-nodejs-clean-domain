import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { Answer } from '@domains/forum/enterprise/entities/answer'
import { AnswerProps } from '@domains/forum/enterprise/entities/answer/types'

export function makeAnswer(
  override: Partial<AnswerProps> = {},
  id: UniqueEntityID | undefined = undefined,
) {
  return Answer.create(
    {
      authorId: new UniqueEntityID(),
      questionId: new UniqueEntityID(),
      content: faker.lorem.paragraphs(),
      ...override,
    },
    id,
  )
}
