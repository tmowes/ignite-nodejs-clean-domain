import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { SpyInstance } from 'vitest'
import { makeQuestion } from 'test/factories/make-question'
import { waitFor } from 'test/helpers/wait-for'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'

import { SendNotificationUseCase } from '../../use-cases/send-notification'
import {
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from '../../use-cases/send-notification/types'

import { OnQuestionCommented } from '.'

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy: SpyInstance<
  [SendNotificationUseCaseRequest],
  Promise<SendNotificationUseCaseResponse>
>

describe('On Question Commented', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository)
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sendNotificationUseCase = new SendNotificationUseCase(inMemoryNotificationsRepository)
    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    // eslint-disable-next-line no-new
    new OnQuestionCommented(inMemoryQuestionsRepository, sendNotificationUseCase)
  })

  it('should send a notification when an question is commented', async () => {
    const question = makeQuestion()

    const questionComment = makeQuestionComment({ questionId: question.id })

    inMemoryQuestionsRepository.create(question)

    inMemoryQuestionCommentsRepository.create(questionComment)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
