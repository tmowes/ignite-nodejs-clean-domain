import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { DomainEvent } from '@core/events/domain-event'

// eslint-disable-next-line import/no-cycle
import { AnswerComment } from '../../entities/answer-comment'

export class AnswerCommentedEvent implements DomainEvent {
  public ocurredAt: Date

  public answerComment: AnswerComment

  constructor(answerComment: AnswerComment) {
    this.answerComment = answerComment
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.answerComment.id
  }
}
