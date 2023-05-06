import { QuestionCommentsRepository } from '@domains/forum/application/repositories/question-comments-repository'

import { FetchCommentsOnQuestionUseCaseRequest, FetchCommentsOnQuestionUseCaseResponse } from './types'

export class FetchCommentsOnQuestionUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page,
  }: FetchCommentsOnQuestionUseCaseRequest): Promise<FetchCommentsOnQuestionUseCaseResponse> {
    const questionComments = await this.questionCommentsRepository.findManyByQuestionId(questionId, {
      page,
    })

    return { questionComments }
  }
}
