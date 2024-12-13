const { MissionUtils } = require('@woowacourse/mission-utils');

const retryUntilSuccess = async (callbackFunction, tryCount = 0) => {
  try {
    return await callbackFunction();
  } catch (error) {
    if (tryCount > 10) return null;

    MissionUtils.Console.print(error.message);

    return await retryUntilSuccess(callbackFunction, tryCount + 1);
  }
};

const createArrayWithNumbers = (length) => Array.from({ length }, (_, idx) => idx + 1);

const getCountArrayHas = (array, value) => array.filter((item) => item === value).length;

module.exports = {
  retryUntilSuccess,
  createArrayWithNumbers,
  getCountArrayHas,
};
