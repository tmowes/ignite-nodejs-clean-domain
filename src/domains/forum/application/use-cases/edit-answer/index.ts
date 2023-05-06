import { AnswersRepository } from '@domains/forum/application/repositories/answers-repository'

import { EditAnswerUseCaseRequest, EditAnswerUseCaseResponse } from './types'

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed')
    }

    const updatedAnswer = Object.assign(answer, { content })

    await this.answersRepository.save(updatedAnswer)

    return { answer: updatedAnswer }
  }
}
