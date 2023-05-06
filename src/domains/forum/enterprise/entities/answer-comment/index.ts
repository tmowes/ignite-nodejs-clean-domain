import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { Optional } from '@core/types/optional'

import { Comment } from '../comment'
import { AnswerCommentProps } from './types'

export class AnswerComment extends Comment<AnswerCommentProps> {
  get answerId() {
    return this.props.answerId
  }

  static create(props: Optional<AnswerCommentProps, 'createdAt'>, id?: UniqueEntityID) {
    return new AnswerComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}
