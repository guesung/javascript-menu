const { ERROR_MESSAGE } = require('../lib/constants.js');

class InputValidator {
  static validateCoach(coach) {
    this.#validate(coach);
  }

  static validateFoodNotEat(foodNotEat) {
    this.#validate(foodNotEat);
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

module.exports = InputValidator;
