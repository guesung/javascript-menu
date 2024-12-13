class CoachModel {
  name;
  #foodNotEat;
  foods;

  constructor(name) {
    this.name = name;
    this.foods = [];
  }

  setFoodNotEat(foodNotEat) {
    this.#foodNotEat = foodNotEat;
  }

  checkEatFood(food) {
    return ![...this.#foodNotEat, ...this.foods].includes(food);
  }

  addFood(food) {
    this.foods.push(food);
  }
}

module.exports = CoachModel;
