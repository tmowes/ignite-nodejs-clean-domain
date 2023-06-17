import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { makeQuestionComment } from 'test/factories/make-question-comment'

import { FetchCommentsOnQuestionUseCase } from '.'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: FetchCommentsOnQuestionUseCase

const questionId = new UniqueEntityID('question-1')

describe('Fetch Comments On Question', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new FetchCommentsOnQuestionUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to fetch comments on question', async () => {
    await Promise.all([
      inMemoryQuestionCommentsRepository.create(makeQuestionComment({ questionId })),
      inMemoryQuestionCommentsRepository.create(makeQuestionComment({ questionId })),
      inMemoryQuestionCommentsRepository.create(makeQuestionComment({ questionId })),
    ])

    const { value } = await sut.execute({ questionId: questionId.toString(), page: 1 })

    expect(value?.questionComments).toHaveLength(3)
  })

  it('should not be able to delete a comment on question from another user', async () => {
    await Promise.all([
      new Array(22)
        .fill(null)
        .map(() => inMemoryQuestionCommentsRepository.create(makeQuestionComment({ questionId }))),
    ])

    const { value } = await sut.execute({ questionId: questionId.toString(), page: 2 })

    expect(value?.questionComments).toHaveLength(2)
  })
})
