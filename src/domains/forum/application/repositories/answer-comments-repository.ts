import { PaginationParams } from '@core/repositories/pagination-params'
import { AnswerComment } from '@domains/forum/enterprise/entities/answer-comment'

export interface AnswerCommentsRepository {
  create(answerComment: AnswerComment): Promise<void>
  delete(answerComment: AnswerComment): Promise<void>
  findById(id: string): Promise<AnswerComment | null>
  findManyByAnswerId(id: string, { page }: PaginationParams): Promise<AnswerComment[]>
}
