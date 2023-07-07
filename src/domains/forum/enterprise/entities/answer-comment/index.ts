import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { Optional } from '@core/types/optional'

import { Comment } from '../comment'
import { AnswerCommentProps } from './types'
// eslint-disable-next-line import/no-cycle
import { AnswerCommentedEvent } from '../../events/answer-commented'

export class AnswerComment extends Comment<AnswerCommentProps> {
  get answerId() {
    return this.props.answerId
  }

  static create(props: Optional<AnswerCommentProps, 'createdAt'>, id?: UniqueEntityID) {
    const answerComment = new AnswerComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    const isNewAnswerComment = !id

    if (isNewAnswerComment) {
      answerComment.addDomainEvent(new AnswerCommentedEvent(answerComment))
    }

    return answerComment
  }
}
