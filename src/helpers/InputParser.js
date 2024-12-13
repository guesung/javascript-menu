const { SEPARATER } = require('../lib/constants.js');

class InputParser {
  static parseCoach(rawCoach) {
    const coach = rawCoach.split(SEPARATER);
    return coach;
  }

  static parseFoodNotEat(rawFoodNotEat) {
    const foodNotEat = rawFoodNotEat.split(SEPARATER);
    return foodNotEat;
  }

  static parseExample3(rawExample3) {
    const example3 = rawExample3;
    return example3;
  }

  static parseExample4(rawExample4) {
    const example4 = rawExample4;
    return example4;
  }

  static parseExample5(rawExample5) {
    const example5 = rawExample5;
    return example5;
  }
}

module.exports = InputParser;
