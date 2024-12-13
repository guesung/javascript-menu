/* eslint-disable no-await-in-loop */
/* eslint-disable no-unreachable-loop */
const { Random } = require('@woowacourse/mission-utils');
const InputView = require('./views/InputView.js');
const { MENUS } = require('./lib/constants.js');
const CoachModel = require('./models/CoachModel.js');
const OutputView = require('./views/OutputView.js');

class App {
  #coachModels;

  async play() {
    OutputView.printStart();

    const coachs = await InputView.readCoach();
    this.#coachModels = coachs.map((coach) => new CoachModel(coach));
    for await (const coachModel of this.#coachModels) {
      const foodNotEat = await InputView.readFoodNotEat(coachModel.name);
      coachModel.setFoodNotEat(foodNotEat);
    }
    const categories = [];
    for (let day = 0; day < 5; day += 1) {
      while (1) {
        const categoryIndex = Random.pickNumberInRange(1, 5);
        const category = Object.keys(MENUS)[categoryIndex - 1];
        if (categories.filter((it) => it === category).length < 2) {
          categories.push(category);
          break;
        }
      }
    }
    for await (const coachModel of this.#coachModels) {
      for (let day = 0; day < 5; day += 1) {
        const category = categories[day];
        const menus = MENUS[category];
        while (1) {
          const menuIndex = Random.shuffle(Array.from({ length: 9 }, (_, idx) => idx + 1))[0];
          const menu = menus[menuIndex - 1];
          const canEatFood = coachModel.checkEatFood(menu);
          if (!canEatFood) continue;

          coachModel.setFood(menu);
          break;
        }
      }
    }

    OutputView.printResult(this.#coachModels, categories);
  }
}

module.exports = App;
