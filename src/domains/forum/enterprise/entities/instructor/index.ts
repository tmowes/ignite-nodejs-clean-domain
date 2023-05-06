import { Entity } from '@core/entities/entity'
import { UniqueEntityID } from '@core/entities/unique-entity-id'

import { InstructorProps } from './types'

export class Instructor extends Entity<InstructorProps> {
  static create(props: InstructorProps, id?: UniqueEntityID) {
    return new Instructor(props, id)
  }
}
