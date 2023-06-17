import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { AnswerAttachment } from '@domains/forum/enterprise/entities/answer-attachment'
import { AnswerAttachmentProps } from '@domains/forum/enterprise/entities/answer-attachment/types'

export function makeAnswerAttachment(
  override: Partial<AnswerAttachmentProps> = {},
  id: UniqueEntityID | undefined = undefined,
) {
  return AnswerAttachment.create(
    {
      answerId: new UniqueEntityID(),
      attachmentId: new UniqueEntityID(),
      ...override,
    },
    id,
  )
}
