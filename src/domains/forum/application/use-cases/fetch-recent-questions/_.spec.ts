import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'

import { FetchRecentQuestionsUseCase } from '.'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository)
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to fetch recent questions', async () => {
    const questionsDates = [new Date(2022, 0, 18), new Date(2022, 0, 20), new Date(2022, 0, 23)]

    await Promise.all([
      inMemoryQuestionsRepository.create(makeQuestion({ createdAt: questionsDates[0] })),
      inMemoryQuestionsRepository.create(makeQuestion({ createdAt: questionsDates[1] })),
      inMemoryQuestionsRepository.create(makeQuestion({ createdAt: questionsDates[2] })),
    ])

    const { value } = await sut.execute({ page: 1 })

    expect(value?.questions).toEqual([
      expect.objectContaining({ createdAt: questionsDates[2] }),
      expect.objectContaining({ createdAt: questionsDates[1] }),
      expect.objectContaining({ createdAt: questionsDates[0] }),
    ])
  })

  it('should not be able to fetch paginated recent questions', async () => {
    await Promise.all([
      new Array(22).fill(null).map((_, index) =>
        inMemoryQuestionsRepository.create(
          makeQuestion(
            {
              createdAt: new Date(2022, 0, index + 1),
            },
            new UniqueEntityID(`question-${index + 1}`),
          ),
        ),
      ),
    ])

    const { value } = await sut.execute({ page: 2 })

    expect(value?.questions).toHaveLength(2)
    expect(value?.questions).toEqual([
      expect.objectContaining({ id: new UniqueEntityID('question-2') }),
      expect.objectContaining({ id: new UniqueEntityID('question-1') }),
    ])
  })
})
