import { UniqueEntityID } from '@core/entities/unique-entity-id'

import { CommentProps } from '../comment/types'

export type AnswerCommentProps = CommentProps & {
  answerId: UniqueEntityID
}
