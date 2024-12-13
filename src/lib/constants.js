const INPUT_MESSAGE = {
  coach: () => `코치의 이름을 입력해 주세요. (, 로 구분)\n`,
  foodNotEat: (coachName) => `${coachName}(이)가 못 먹는 메뉴를 입력해 주세요.\n`,
  example3: () => `\n`,
  example4: () => `\n`,
  example5: () => `\n`,
};

const OUTPUT_MESSAGE = {
  start: () => `점심 메뉴 추천을 시작합니다.`,
  end: () => `추천을 완료했습니다.`,
};

const ERROR_MESSAGE_DEFAULT = '[ERROR]';
const ERROR_MESSAGE = {
  example: {
    default: `${ERROR_MESSAGE_DEFAULT} 예시를 입력해주세요!`,
  },
};

const SEPARATER = ',';

module.exports = {
  INPUT_MESSAGE,
  OUTPUT_MESSAGE,
  ERROR_MESSAGE_DEFAULT,
  ERROR_MESSAGE,
  SEPARATER,
};
