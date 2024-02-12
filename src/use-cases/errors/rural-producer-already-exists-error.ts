export class RuralProducerAlreadyExistsError extends Error {
  constructor() {
    super('There is already a rural producer with the same document.')
  }
}
