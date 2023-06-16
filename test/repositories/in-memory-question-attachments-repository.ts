import { QuestionAttachmentsRepository } from '@domains/forum/application/repositories/question-attachments-repository'
import { QuestionAttachment } from '@domains/forum/enterprise/entities/question-attachment'

export class InMemoryQuestionAttachmentsRepository implements QuestionAttachmentsRepository {
  public items: QuestionAttachment[] = []

  async findManyByQuestionId(questionId: string) {
    return this.items.filter((item) => item.questionId.toString() === questionId)
  }

  async deleteManyByQuestionId(questionId: string) {
    this.items = this.items.filter((item) => item.questionId.toString() !== questionId)
  }
}
