import { AnswerAttachmentsRepository } from '@domains/forum/application/repositories/answer-attachments-repository'
import { AnswerAttachment } from '@domains/forum/enterprise/entities/answer-attachment'

export class InMemoryAnswerAttachmentsRepository implements AnswerAttachmentsRepository {
  public items: AnswerAttachment[] = []

  async findManyByAnswerId(answerId: string) {
    return this.items.filter((item) => item.answerId.toString() === answerId)
  }

  async deleteManyByAnswerId(answerId: string) {
    this.items = this.items.filter((item) => item.answerId.toString() !== answerId)
  }
}
