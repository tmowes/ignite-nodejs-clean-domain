import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { Question } from '@domains/forum/enterprise/entities/question'
import { QuestionsRepository } from '@domains/forum/application/repositories/questions-repository'

import { CreateQuestionUseCaseRequest, CreateQuestionUseCaseResponse } from './types'

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    })

    await this.questionsRepository.create(question)

    return { question }
  }
}
