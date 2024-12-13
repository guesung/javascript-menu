import { ERROR_MESSAGE } from '../lib/constants.js';

export default class InputValidator {
  static validateExample1(example1) {
    this.#validate(example1);
  }

  static validateExample2(example2) {
    this.#validate(example2);
  }

  static validateExample3(example3) {
    this.#validate(example3);
  }

  static validateExample4(example4) {
    this.#validate(example4);
  }

  static validateExample5(example5) {
    this.#validate(example5);
  }

  static #validate(example) {
    if (!example) this.#throwError(ERROR_MESSAGE.notExample);
  }

  static #throwError(message) {
    throw new Error(message);
  }
}
