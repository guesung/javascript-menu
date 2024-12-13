const INPUT_MESSAGE = {
  coach: () => `코치의 이름을 입력해 주세요. (, 로 구분)\n`,
  foodNotEat: (coachName) => `${coachName}(이)가 못 먹는 메뉴를 입력해 주세요.\n`,
};

const OUTPUT_MESSAGE = {
  start: () => `점심 메뉴 추천을 시작합니다.`,
  result: () => `메뉴 추천 결과입니다.`,
  end: () => `추천을 완료했습니다.`,
  columns: () => `[ 구분 | 월요일 | 화요일 | 수요일 | 목요일 | 금요일 ]`,
};

const ERROR_MESSAGE_DEFAULT = '[ERROR]';
const ERROR_MESSAGE = {
  coach: {
    count: `${ERROR_MESSAGE_DEFAULT} 코치는 최소 2명 이상 5명 이하로 입력해야 합니다.`,
    length: `${ERROR_MESSAGE_DEFAULT} 코치 이름은 2글자 이상 4글자 이하여야 합니다.`,
    unique: `${ERROR_MESSAGE_DEFAULT} 코치 이름은 중복되면 안됩니다.`,
  },
  foodNotEat: {
    count: `${ERROR_MESSAGE_DEFAULT} 못 먹는 메뉴는 2개 이하여야 합니다.`,
    exist: `${ERROR_MESSAGE_DEFAULT} 메뉴에 있는 메뉴여야 합니다.`,
  },
};

const SEPARATER = ',';

const MENUS = {
  일식: ['규동', '우동', '미소시루', '스시', '가츠동', '오니기리', '하이라이스', '라멘', '오코노미야끼'],
  한식: ['김밥', '김치찌개', '쌈밥', '된장찌개', '비빔밥', '칼국수', '불고기', '떡볶이', '제육볶음'],
  중식: ['깐풍기', '볶음면', '동파육', '짜장면', '짬뽕', '마파두부', '탕수육', '토마토 달걀볶음', '고추잡채'],
  아시안: ['팟타이', '카오 팟', '나시고렝', '파인애플 볶음밥', '쌀국수', '똠얌꿍', '반미', '월남쌈', '분짜'],
  양식: ['라자냐', '그라탱', '뇨끼', '끼슈', '프렌치 토스트', '바게트', '스파게티', '피자', '파니니'],
};

module.exports = {
  INPUT_MESSAGE,
  OUTPUT_MESSAGE,
  ERROR_MESSAGE_DEFAULT,
  ERROR_MESSAGE,
  SEPARATER,
  MENUS,
};
