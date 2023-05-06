import { PaginationParams } from '@core/repositories/pagination-params'
import { AnswerCommentsRepository } from '@domains/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@domains/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository implements AnswerCommentsRepository {
  public items: AnswerComment[] = []

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    const index = this.items.findIndex((item) => item.id === answerComment.id)
    this.items.splice(index, 1)
  }

  async findById(id: string): Promise<AnswerComment | null> {
    return this.items.find((item) => item.id.toString() === id) ?? null
  }

  async findManyByAnswerId(id: string, { page }: PaginationParams): Promise<AnswerComment[]> {
    return this.items
      .filter((item) => item.answerId.toString() === id)
      .slice((page - 1) * 20, page * 20)
  }
}
