import { PaginationParams } from '@core/repositories/pagination-params'
import { AnswersRepository } from '@domains/forum/application/repositories/answers-repository'
import { Answer } from '@domains/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = []

  async create(answer: Answer) {
    this.items.push(answer)
  }

  async save(answer: Answer): Promise<void> {
    const index = this.items.findIndex((item) => item.id === answer.id)
    this.items[index] = answer
  }

  async delete(answer: Answer): Promise<void> {
    const index = this.items.findIndex((item) => item.id === answer.id)
    this.items.splice(index, 1)
  }

  async findById(id: string): Promise<Answer | null> {
    return this.items.find((item) => item.id.toString() === id) ?? null
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams): Promise<Answer[]> {
    return this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)
  }
}
