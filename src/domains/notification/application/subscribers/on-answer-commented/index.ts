import { DomainEvents } from '@core/events/domain-events'
import { EventHandler } from '@core/events/event-handler'
import { AnswerCommentedEvent } from '@domains/forum/enterprise/events/answer-commented'
import { AnswersRepository } from '@domains/forum/application/repositories/answers-repository'

import { SendNotificationUseCase } from '../../use-cases/send-notification'

export class OnAnswerCommented implements EventHandler {
  constructor(
    private answersRepository: AnswersRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.sendNewAnswerCommentNotification.bind(this), AnswerCommentedEvent.name)
  }

  private async sendNewAnswerCommentNotification({ answerComment }: AnswerCommentedEvent) {
    const answer = await this.answersRepository.findById(answerComment.answerId.toString())

    if (answer) {
      await this.sendNotification.execute({
        recipientId: answer.authorId.toString(),
        title: `Novo comentário em "${answer.content.substring(0, 40).concat('...')}"`,
        content: answerComment.excerpt,
      })
    }
  }
}
