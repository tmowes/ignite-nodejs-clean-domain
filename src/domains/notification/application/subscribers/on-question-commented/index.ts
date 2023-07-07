import { DomainEvents } from '@core/events/domain-events'
import { EventHandler } from '@core/events/event-handler'
import { QuestionsRepository } from '@domains/forum/application/repositories/questions-repository'
import { QuestionCommentedEvent } from '@domains/forum/enterprise/events/question-commented'

import { SendNotificationUseCase } from '../../use-cases/send-notification'

export class OnQuestionCommented implements EventHandler {
  constructor(
    private questionsRepository: QuestionsRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewQuestionCommentNotification.bind(this),
      QuestionCommentedEvent.name,
    )
  }

  private async sendNewQuestionCommentNotification({ questionComment }: QuestionCommentedEvent) {
    const question = await this.questionsRepository.findById(questionComment.questionId.toString())

    if (question) {
      await this.sendNotification.execute({
        recipientId: question.authorId.toString(),
        title: `Novo comentário em "${question.title.substring(0, 40).concat('...')}"`,
        content: questionComment.excerpt,
      })
    }
  }
}
