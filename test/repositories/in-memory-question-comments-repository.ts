import { DomainEvents } from '@core/events/domain-events'
import { PaginationParams } from '@core/repositories/pagination-params'
import { QuestionCommentsRepository } from '@domains/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@domains/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository {
  public items: QuestionComment[] = []

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
    DomainEvents.dispatchEventsForAggregate(questionComment.id)
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    const index = this.items.findIndex((item) => item.id === questionComment.id)
    this.items.splice(index, 1)
  }

  async findById(id: string): Promise<QuestionComment | null> {
    return this.items.find((item) => item.id.toString() === id) ?? null
  }

  async findManyByQuestionId(id: string, { page }: PaginationParams): Promise<QuestionComment[]> {
    return this.items
      .filter((item) => item.questionId.toString() === id)
      .slice((page - 1) * 20, page * 20)
  }
}
