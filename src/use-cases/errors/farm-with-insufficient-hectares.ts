export class FarmWithInsufficientHectares extends Error {
  constructor() {
    super(
      'The sum of arable area and vegetation must not be greater than the total area of the farm.',
    )
  }
}
