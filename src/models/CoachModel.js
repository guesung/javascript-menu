class CoachModel {
  name;
  #foodsNotEat;
  foods;

  constructor(name) {
    this.name = name;
    this.foods = [];
  }

  setFoodNotEat(foodsNotEat) {
    this.#foodsNotEat = foodsNotEat;
  }

  checkEatFood(food) {
    return ![...this.#foodsNotEat, ...this.foods].includes(food);
  }

  addFood(food) {
    this.foods.push(food);
  }
}

module.exports = CoachModel;
