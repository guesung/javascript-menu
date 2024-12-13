const { Random } = require('@woowacourse/mission-utils');
const { MENUS } = require('./lib/constants.js');
const InputView = require('./views/InputView.js');
const CoachModel = require('./models/CoachModel.js');
const OutputView = require('./views/OutputView.js');
const CategoryModel = require('./models/CategoryModel.js');
const { retryUntilSuccess } = require('./lib/utils.js');

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

    const categoryModel = new CategoryModel();
    categoryModel.makeCategory();

    for await (const coachModel of this.#coachModels) {
      for (let day = 0; day < 5; day += 1) {
        const category = categoryModel.categories[day];
        const menus = MENUS[category];
        retryUntilSuccess(() => {
          const menuIndex = Random.shuffle(Array.from({ length: 9 }, (_, idx) => idx + 1))[0];
          const menu = menus[menuIndex - 1];
          const canEatFood = coachModel.checkEatFood(menu);
          if (!canEatFood) throw new Error();

          coachModel.setFood(menu);
        });
      }
    }

    OutputView.printResult(this.#coachModels, categoryModel.categories);
  }
}

module.exports = App;
