import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { Optional } from '@core/types/optional'

import { QuestionCommentProps } from './types'
import { Comment } from '../comment'

export class QuestionComment extends Comment<QuestionCommentProps> {
  get questionId() {
    return this.props.questionId
  }

  static create(props: Optional<QuestionCommentProps, 'createdAt'>, id?: UniqueEntityID) {
    return new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}
