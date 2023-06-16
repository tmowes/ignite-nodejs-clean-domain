import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { QuestionAttachment } from '@domains/forum/enterprise/entities/question-attachment'
import { QuestionAttachmentProps } from '@domains/forum/enterprise/entities/question-attachment/types'

export function makeQuestionAttachment(
  override: Partial<QuestionAttachmentProps> = {},
  id: UniqueEntityID | undefined = undefined,
) {
  return QuestionAttachment.create(
    {
      questionId: new UniqueEntityID(),
      attachmentId: new UniqueEntityID(),
      ...override,
    },
    id,
  )
}
