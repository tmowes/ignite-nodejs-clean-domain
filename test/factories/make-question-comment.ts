import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { QuestionComment } from '@domains/forum/enterprise/entities/question-comment'
import { QuestionCommentProps } from '@domains/forum/enterprise/entities/question-comment/types'

export function makeQuestionComment(
  override: Partial<QuestionCommentProps> = {},
  id: UniqueEntityID | undefined = undefined,
) {
  return QuestionComment.create(
    {
      questionId: new UniqueEntityID(),
      authorId: new UniqueEntityID(),
      content: faker.lorem.paragraphs(),
      ...override,
    },
    id,
  )
}
