const { MissionUtils } = require('@woowacourse/mission-utils');

const { OUTPUT_MESSAGE } = require('../lib/constants.js');

class OutputView {
  static printBlank() {
    this.print('');
  }

  static printStart() {
    this.print(OUTPUT_MESSAGE.start());
  }

  static printResult(coachModels, categories) {
    this.print(OUTPUT_MESSAGE.result());
    this.print(OUTPUT_MESSAGE.columns());
    this.print(`[ 카테고리 | ${categories.join(' | ')} ]`);
    for (const coachModel of coachModels) {
      this.print(`[ ${coachModel.name} | ${coachModel.foods.join(' | ')} ]`);
    }
    this.print(OUTPUT_MESSAGE.end());
  }

  static print(message) {
    return MissionUtils.Console.print(message);
  }
}

module.exports = OutputView;
