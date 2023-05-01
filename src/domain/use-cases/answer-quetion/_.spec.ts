import { Answer } from '@domain/entities/answer'
import { AnswersRepository } from '@domain/repositories/answer-repository'

import { AnswerQuestionUseCase } from '.'

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => Promise.resolve(),
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await answerQuestion.execute({
    questionId: '1',
    instructorId: '1',
    content: 'Nova resposta',
  })

  expect(answer.content).toEqual('Nova resposta')
})
