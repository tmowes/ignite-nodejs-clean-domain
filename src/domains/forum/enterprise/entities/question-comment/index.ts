import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { Optional } from '@core/types/optional'

import { QuestionCommentProps } from './types'
import { Comment } from '../comment'
// eslint-disable-next-line import/no-cycle
import { QuestionCommentedEvent } from '../../events/question-commented'

export class QuestionComment extends Comment<QuestionCommentProps> {
  get questionId() {
    return this.props.questionId
  }

  static create(props: Optional<QuestionCommentProps, 'createdAt'>, id?: UniqueEntityID) {
    const questionComment = new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    const isNewQuestionComment = !id

    if (isNewQuestionComment) {
      questionComment.addDomainEvent(new QuestionCommentedEvent(questionComment))
    }

    return questionComment
  }
}
