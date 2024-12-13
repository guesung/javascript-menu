const { Random } = require('@woowacourse/mission-utils');
const { MENUS } = require('../lib/constants.js');
const { retryUntilSuccess } = require('../lib/utils.js');

class CategoryModel {
  categories;

  constructor() {
    this.categories = [];
  }

  makeCategory() {
    for (let day = 0; day < 5; day += 1) {
      retryUntilSuccess(() => {
        const categoryIndex = Random.pickNumberInRange(1, 5);
        const category = Object.keys(MENUS)[categoryIndex - 1];

        if (this.categories.filter((it) => it === category).length >= 2) throw new Error();

        this.categories.push(category);
      });
    }
  }
}

module.exports = CategoryModel;
