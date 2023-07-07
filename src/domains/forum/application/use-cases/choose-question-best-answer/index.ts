import { AnswersRepository } from '@domains/forum/application/repositories/answers-repository'
import { QuestionsRepository } from '@domains/forum/application/repositories/questions-repository'
import { left, right } from '@core/entities/either'
import { ResourceNotFoundError } from '@core/errors/resource-not-found'
import { NotAllowedError } from '@core/errors/not-allowed'

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
      return left(new ResourceNotFoundError())
    }

    const question = await this.questionsRepository.findById(answer.questionId.toString())

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    const updatedQuestion = Object.assign(question, { bestAnswerId: answer.id })

    await this.questionsRepository.save(updatedQuestion)

    return right({ question: updatedQuestion })
  }
}
