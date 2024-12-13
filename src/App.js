const { Random } = require('@woowacourse/mission-utils');
const { MENUS, ERROR_MESSAGE } = require('./lib/constants.js');
const { retryUntilSuccess, createArrayWithNumbers } = require('./lib/utils.js');
const InputView = require('./views/InputView.js');
const CoachModel = require('./models/CoachModel.js');
const OutputView = require('./views/OutputView.js');
const CategoryModel = require('./models/CategoryModel.js');

class App {
  #coachModels;

  async play() {
    OutputView.printStart();

    const coachs = await InputView.readCoach();
    this.#coachModels = coachs.map((coach) => new CoachModel(coach));

    for await (const coachModel of this.#coachModels) {
      const foodsNotEat = await InputView.readFoodNotEat(coachModel.name);
      coachModel.setFoodNotEat(foodsNotEat);
    }

    const categoryModel = new CategoryModel();
    categoryModel.makeCategory();

    for await (const coachModel of this.#coachModels) {
      for (let day = 0; day < 5; day += 1) {
        const category = categoryModel.categories[day];
        const menus = MENUS[category];

        retryUntilSuccess(() => {
          const menuIndex = Random.shuffle(createArrayWithNumbers(menus.length))[0];
          const menu = menus[menuIndex - 1];
          const canEatFood = coachModel.checkEatFood(menu);

          if (!canEatFood) throw new Error();

          coachModel.addFood(menu);
        });
      }
    }

    OutputView.printResult(this.#coachModels, categoryModel.categories);
  }
}

module.exports = App;
