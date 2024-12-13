const { ERROR_MESSAGE, MENUS } = require('../lib/constants.js');

class InputValidator {
  static validateCoach(coachs) {
    this.#validateCouchCount(coachs);
    this.#validateCoucnLength(coachs);
    this.#validateCoucnUnique(coachs);
  }

  static #validateCouchCount(coachs) {
    if (coachs.length >= 2 && coachs.length <= 5) return;
    this.#throwError(ERROR_MESSAGE.coach.count);
  }

  static #validateCoucnLength(coachs) {
    if (coachs.every((coach) => coach.length >= 2 && coach.length <= 4)) return;
    this.#throwError(ERROR_MESSAGE.coach.length);
  }

  static #validateCoucnUnique(coachs) {
    if (coachs.length === new Set(coachs).size) return;
    this.#throwError(ERROR_MESSAGE.coach.unique);
  }

  static validateFoodNotEat(foodNotEat) {
    this.#validateFoodNotEatCount(foodNotEat);
    this.#validateFoodNotExist(foodNotEat);
  }

  static #validateFoodNotEatCount(foodNotEat) {
    if (foodNotEat.length <= 2) return;
    this.#throwError(ERROR_MESSAGE.foodNotEat.count);
  }

  static #validateFoodNotExist(foodNotEat) {
    if (foodNotEat.every((food) => Object.values(MENUS).flat().includes(food))) return;

    this.#throwError(ERROR_MESSAGE.foodNotEat.exist);
  }

  static #throwError(message) {
    throw new Error(message);
  }
}

module.exports = InputValidator;
