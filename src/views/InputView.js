import { MissionUtils } from '@woowacourse/mission-utils';

import { InputParser, InputValidator } from '../helpers/index.js';
import { INPUT_MESSAGE } from '../lib/constants.js';
import { retryUntilSuccess } from '../lib/utils.js';

export default class InputView {
  static async readExample1() {
    return retryUntilSuccess(async () => {
      const rawExample1 = await this.#readLineAsync(INPUT_MESSAGE.example1());
      const example1 = InputParser.parseExample1(rawExample1);
      InputValidator.validateExample1(example1);

      return example1;
    });
  }

  static async readExample2() {
    return retryUntilSuccess(async () => {
      const rawExample2 = await this.#readLineAsync(INPUT_MESSAGE.example2());
      const example2 = InputParser.parseExample2(rawExample2);
      InputValidator.validateExample2(example2);

      return example2;
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
