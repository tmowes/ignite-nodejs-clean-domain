import { AnswersRepository } from '@domains/forum/application/repositories/answers-repository'
import { QuestionsRepository } from '@domains/forum/application/repositories/questions-repository'

import {
  ChooseQuestionBestAnswerUseCaseRequest,
  ChooseQuestionBestAnswerUseCaseResponse,
} from './types'

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answersRepository: AnswersRepository,
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    const question = await this.questionsRepository.findById(answer.questionId.toString())

    if (!question) {
      throw new Error('Question not found')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed')
    }

    const updatedQuestion = Object.assign(question, { bestAnswerId: answer.id })

    await this.questionsRepository.save(updatedQuestion)

    return { question: updatedQuestion }
  }
}
