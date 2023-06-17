import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { makeAnswerComment } from 'test/factories/make-answer-comment'

import { FetchCommentsOnAnswerUseCase } from '.'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchCommentsOnAnswerUseCase

const answerId = new UniqueEntityID('answer-1')

describe('Fetch Comments On Answer', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetchCommentsOnAnswerUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to fetch comments on answer', async () => {
    await Promise.all([
      inMemoryAnswerCommentsRepository.create(makeAnswerComment({ answerId })),
      inMemoryAnswerCommentsRepository.create(makeAnswerComment({ answerId })),
      inMemoryAnswerCommentsRepository.create(makeAnswerComment({ answerId })),
    ])

    const { value } = await sut.execute({ answerId: answerId.toString(), page: 1 })

    expect(value?.answerComments).toHaveLength(3)
  })

  it('should not be able to delete a comment on answer from another user', async () => {
    await Promise.all([
      new Array(22)
        .fill(null)
        .map(() => inMemoryAnswerCommentsRepository.create(makeAnswerComment({ answerId }))),
    ])

    const { value } = await sut.execute({ answerId: answerId.toString(), page: 2 })

    expect(value?.answerComments).toHaveLength(2)
  })
})
