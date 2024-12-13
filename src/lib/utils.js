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

const checkUnique = (array) => array.length === new Set(array).size;
const checkDateBetween = (date, startDate, endDate) => date >= startDate && date <= endDate;

module.exports = {
  retryUntilSuccess,
  checkUnique,
  checkDateBetween,
};
