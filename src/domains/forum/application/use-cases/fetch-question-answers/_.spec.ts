import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@core/entities/unique-entity-id'

import { FetchQuestionAnswersUseCase } from '.'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

const questionId = new UniqueEntityID('question-1')

describe('Fetch Question Answers', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should be able to fetch question answer', async () => {
    await Promise.all([
      inMemoryAnswersRepository.create(makeAnswer({ questionId })),
      inMemoryAnswersRepository.create(makeAnswer({ questionId })),
      inMemoryAnswersRepository.create(makeAnswer({ questionId })),
    ])

    const { answers } = await sut.execute({ questionId: questionId.toString(), page: 1 })

    expect(answers).toHaveLength(3)
  })

  it('should not be able to fetch paginated recent questions', async () => {
    await Promise.all([
      new Array(22).fill(null).map(() => inMemoryAnswersRepository.create(makeAnswer({ questionId }))),
    ])

    const { answers } = await sut.execute({ questionId: questionId.toString(), page: 2 })

    expect(answers).toHaveLength(2)
  })
})