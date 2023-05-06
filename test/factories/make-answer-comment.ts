import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { AnswerComment } from '@domains/forum/enterprise/entities/answer-comment'
import { AnswerCommentProps } from '@domains/forum/enterprise/entities/answer-comment/types'

export function makeAnswerComment(
  override: Partial<AnswerCommentProps> = {},
  id: UniqueEntityID | undefined = undefined,
) {
  return AnswerComment.create(
    {
      answerId: new UniqueEntityID(),
      authorId: new UniqueEntityID(),
      content: faker.lorem.paragraphs(),
      ...override,
    },
    id,
  )
}
