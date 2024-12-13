/* eslint-disable no-await-in-loop */
/* eslint-disable no-unreachable-loop */
const { Random } = require('@woowacourse/mission-utils');
const InputView = require('./views/InputView.js');
const { MENUS } = require('./lib/constants.js');
const CoachModel = require('./models/CoachModel.js');

const SAMPLE = {
  일식: '규동, 우동, 미소시루, 스시, 가츠동, 오니기리, 하이라이스, 라멘, 오코노미야끼',
  한식: '김밥, 김치찌개, 쌈밥, 된장찌개, 비빔밥, 칼국수, 불고기, 떡볶이, 제육볶음',
  중식: '깐풍기, 볶음면, 동파육, 짜장면, 짬뽕, 마파두부, 탕수육, 토마토 달걀볶음, 고추잡채',
  아시안: '팟타이, 카오 팟, 나시고렝, 파인애플 볶음밥, 쌀국수, 똠얌꿍, 반미, 월남쌈, 분짜',
  양식: '라자냐, 그라탱, 뇨끼, 끼슈, 프렌치 토스트, 바게트, 스파게티, 피자, 파니니',
};
class App {
  #coachModels;

  async play() {
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

    for (let day = 0; day < 5; day += 1) {
      const category = categories[day];
      const menus = MENUS[category];

      for await (const coachModel of this.#coachModels) {
        while (1) {
          const menuIndex = Random.shuffle(new Array(9).fill().map((_, index) => index))[0];
          const menu = menus[menuIndex];
          const canEatFood = coachModel.checkEatFood(menu);

          if (!canEatFood) continue;

          coachModel.setFood(menu);
          break;
        }
      }
    }
  }
}

module.exports = App;
