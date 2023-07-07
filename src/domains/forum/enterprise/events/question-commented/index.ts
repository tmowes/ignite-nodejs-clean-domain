import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { DomainEvent } from '@core/events/domain-event'

// eslint-disable-next-line import/no-cycle
import { QuestionComment } from '../../entities/question-comment'

export class QuestionCommentedEvent implements DomainEvent {
  public ocurredAt: Date

  public questionComment: QuestionComment

  constructor(questionComment: QuestionComment) {
    this.questionComment = questionComment
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.questionComment.id
  }
}
