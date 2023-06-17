import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'

import { FetchQuestionAnswersUseCase } from '.'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let sut: FetchQuestionAnswersUseCase

const questionId = new UniqueEntityID('question-1')

describe('Fetch Question Answers', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository)
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should be able to fetch question answer', async () => {
    await Promise.all([
      inMemoryAnswersRepository.create(makeAnswer({ questionId })),
      inMemoryAnswersRepository.create(makeAnswer({ questionId })),
      inMemoryAnswersRepository.create(makeAnswer({ questionId })),
    ])

    const { value } = await sut.execute({ questionId: questionId.toString(), page: 1 })

    expect(value?.answers).toHaveLength(3)
  })

  it('should not be able to fetch paginated recent questions', async () => {
    await Promise.all([
      new Array(22).fill(null).map(() => inMemoryAnswersRepository.create(makeAnswer({ questionId }))),
    ])

    const { value } = await sut.execute({ questionId: questionId.toString(), page: 2 })

    expect(value?.answers).toHaveLength(2)
  })
})
