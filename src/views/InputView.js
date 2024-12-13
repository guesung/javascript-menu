const { MissionUtils } = require('@woowacourse/mission-utils');
const { INPUT_MESSAGE } = require('../lib/constants.js');
const { retryUntilSuccess } = require('../lib/utils.js');
const InputParser = require('../helpers/InputParser.js');
const InputValidator = require('../helpers/InputValidator.js');

class InputView {
  static async readCoach() {
    return retryUntilSuccess(async () => {
      const rawCoach = await this.#readLineAsync(INPUT_MESSAGE.coach());
      const coachs = InputParser.parseCoach(rawCoach);
      InputValidator.validateCoach(coachs);

      return coachs;
    });
  }

  static async readFoodNotEat(coachName) {
    return retryUntilSuccess(async () => {
      const rawFoodNotEat = await this.#readLineAsync(INPUT_MESSAGE.foodNotEat(coachName));
      const foodNotEat = InputParser.parseFoodNotEat(rawFoodNotEat);
      InputValidator.validateFoodNotEat(foodNotEat);

      return foodNotEat;
    });
  }

  static async readExample3() {
    return retryUntilSuccess(async () => {
      const rawExample3 = await this.#readLineAsync(INPUT_MESSAGE.example3());
      const example3 = InputParser.parseExample3(rawExample3);
      InputValidator.validateExample3(example3);

      return example3;
    });
  }

  static async readExample4() {
    return retryUntilSuccess(async () => {
      const rawExample4 = await this.#readLineAsync(INPUT_MESSAGE.example4());
      const example4 = InputParser.parseExample4(rawExample4);
      InputValidator.validateExample4(example4);

      return example4;
    });
  }

  static async readExample5() {
    return retryUntilSuccess(async () => {
      const rawExample5 = await this.#readLineAsync(INPUT_MESSAGE.example5());
      const example5 = InputParser.parseExample5(rawExample5);
      InputValidator.validateExample5(example5);

      return example5;
    });
  }

  static #readLineAsync(message) {
    return MissionUtils.Console.readLineAsync(message);
  }
}

module.exports = InputView;
