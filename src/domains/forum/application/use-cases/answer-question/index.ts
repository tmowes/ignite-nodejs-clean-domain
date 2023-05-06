import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { Answer } from '@domains/forum/enterprise/entities/answer'
import { AnswersRepository } from '@domains/forum/application/repositories/answers-repository'

import { AnswerQuestionUseCaseRequest, AnswerQuestionUseCaseResponse } from './types'

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    })

    await this.answersRepository.create(answer)

    return { answer }
  }
}
