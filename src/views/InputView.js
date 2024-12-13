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
      const foodsNotEat = InputParser.parseFoodNotEat(rawFoodNotEat);
      InputValidator.validateFoodNotEat(foodsNotEat);

      return foodsNotEat;
    });
  }

  static #readLineAsync(message) {
    return MissionUtils.Console.readLineAsync(message);
  }
}

module.exports = InputView;
