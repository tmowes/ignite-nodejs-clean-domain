import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { Answer } from '@domain/entities/answer'
import { AnswersRepository } from '@domain/repositories/answer-repository'

import { AnswerQuestionUseCaseRequest } from './types'

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest) {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(questionId),
    })

    await this.answersRepository.create(answer)

    return answer
  }
}
