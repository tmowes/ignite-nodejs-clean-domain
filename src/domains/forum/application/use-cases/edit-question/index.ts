import { QuestionsRepository } from '@domains/forum/application/repositories/questions-repository'

import { EditQuestionUseCaseRequest, EditQuestionUseCaseResponse } from './types'

export class EditQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
    content,
    title,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed')
    }

    const updatedQuestion = Object.assign(question, { content, title })

    await this.questionsRepository.save(updatedQuestion)

    return { question: updatedQuestion }
  }
}
