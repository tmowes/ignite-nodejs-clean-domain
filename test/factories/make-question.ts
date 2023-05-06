import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { Question } from '@domains/forum/enterprise/entities/question'
import { QuestionProps } from '@domains/forum/enterprise/entities/question/types'
import { Slug } from '@domains/forum/enterprise/entities/value-objects/slug'

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id: UniqueEntityID | undefined = undefined,
) {
  return Question.create(
    {
      authorId: new UniqueEntityID(),
      title: faker.lorem.sentence(),
      slug: Slug.create('example-question'),
      content: faker.lorem.paragraphs(),
      ...override,
    },
    id,
  )
}
