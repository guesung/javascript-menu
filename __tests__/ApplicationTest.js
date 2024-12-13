const MissionUtils = require('@woowacourse/mission-utils');
const App = require('../src/App');
const { ERROR_MESSAGE } = require('../src/lib/constants.js');

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();
  numbers.reduce((acc, number) => acc.mockReturnValueOnce(number), MissionUtils.Random.pickNumberInRange);
};

const mockShuffles = (rows) => {
  MissionUtils.Random.shuffle = jest.fn();

  rows.reduce(
    (acc, [firstNumber, numbers]) =>
      acc.mockReturnValueOnce([firstNumber, ...numbers.filter((number) => number !== firstNumber)]),
    MissionUtils.Random.shuffle,
  );
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  return logSpy;
};

const getOutput = (logSpy) => [...logSpy.mock.calls].join('');

const expectLogContains = (received, logs) => {
  logs.forEach((log) => {
    expect(received).toEqual(expect.stringContaining(log));
  });
};

describe('점심 메뉴 테스트', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('전체 기능 테스트', () => {
    test('카테고리 메뉴 중복 없는 추천', async () => {
      const logSpy = getLogSpy();

      mockRandoms([2, 5, 1, 3, 4]);
      mockQuestions(['구구,제임스', '김밥', '떡볶이']);

      const sequenced = (_, idx) => idx + 1;
      mockShuffles([
        // 구구
        [2, Array.from({ length: 9 }, sequenced)],
        [7, Array.from({ length: 9 }, sequenced)],
        [1, Array.from({ length: 9 }, sequenced)],
        [4, Array.from({ length: 9 }, sequenced)],
        [2, Array.from({ length: 9 }, sequenced)],

        // 제임스
        [9, Array.from({ length: 9 }, sequenced)],
        [1, Array.from({ length: 9 }, sequenced)],
        [5, Array.from({ length: 9 }, sequenced)],
        [5, Array.from({ length: 9 }, sequenced)],
        [4, Array.from({ length: 9 }, sequenced)],
      ]);

      const app = new App();
      await app.play();
      const log = getOutput(logSpy);

      expect(log.replace(/\n/g, '')).toEqual(
        expect.stringContaining(
          [
            '점심 메뉴 추천을 시작합니다.',
            '메뉴 추천 결과입니다.',
            '[ 구분 | 월요일 | 화요일 | 수요일 | 목요일 | 금요일 ]',
            '[ 카테고리 | 한식 | 양식 | 일식 | 중식 | 아시안 ]',
            '[ 구구 | 김치찌개 | 스파게티 | 규동 | 짜장면 | 카오 팟 ]',
            '[ 제임스 | 제육볶음 | 라자냐 | 가츠동 | 짬뽕 | 파인애플 볶음밥 ]',
            '추천을 완료했습니다.',
          ].join(''),
        ),
      );
    });

    test('한 주에 카테고리가 2회 반복될 경우 해당 해당 카테고리는 선택한다.', async () => {
      const logSpy = getLogSpy();

      mockRandoms([2, 5, 1, 3, 3]); // 목,금 2회
      mockQuestions(['구구,제임스', '김밥', '떡볶이']);

      const sequenced = (_, idx) => idx + 1;
      mockShuffles([
        // 구구
        [2, Array.from({ length: 9 }, sequenced)],
        [7, Array.from({ length: 9 }, sequenced)],
        [1, Array.from({ length: 9 }, sequenced)],
        [4, Array.from({ length: 9 }, sequenced)],
        [2, Array.from({ length: 9 }, sequenced)],

        // 제임스
        [9, Array.from({ length: 9 }, sequenced)],
        [1, Array.from({ length: 9 }, sequenced)],
        [5, Array.from({ length: 9 }, sequenced)],
        [5, Array.from({ length: 9 }, sequenced)],
        [4, Array.from({ length: 9 }, sequenced)],
      ]);

      const app = new App();
      await app.play();
      const log = getOutput(logSpy);

      expect(log.replace(/\n/g, '')).toEqual(
        expect.stringContaining(
          [
            '[ 카테고리 | 한식 | 양식 | 일식 | 중식 | 중식 ]',
            '[ 구구 | 김치찌개 | 스파게티 | 규동 | 짜장면 | 볶음면 ]',
            '[ 제임스 | 제육볶음 | 라자냐 | 가츠동 | 짬뽕 | 짜장면 ]',
          ].join(''),
        ),
      );
    });

    test('한 주에 카테고리가 3회 이상 반복될 경우 해당 해당 카테고리는 선택하지 않고 다시 뽑난다.', async () => {
      const logSpy = getLogSpy();

      mockRandoms([2, 5, 3, 3, 3, 1]); // 수,목에 이어 금요일에 3회 반복된다.
      mockQuestions(['구구,제임스', '김밥', '떡볶이']);

      const sequenced = (_, idx) => idx + 1;
      mockShuffles([
        // 구구
        [2, Array.from({ length: 9 }, sequenced)],
        [7, Array.from({ length: 9 }, sequenced)],
        [1, Array.from({ length: 9 }, sequenced)],
        [4, Array.from({ length: 9 }, sequenced)],
        [2, Array.from({ length: 9 }, sequenced)],

        // 제임스
        [9, Array.from({ length: 9 }, sequenced)],
        [1, Array.from({ length: 9 }, sequenced)],
        [5, Array.from({ length: 9 }, sequenced)],
        [6, Array.from({ length: 9 }, sequenced)],
        [4, Array.from({ length: 9 }, sequenced)],
      ]);

      const app = new App();
      await app.play();
      const log = getOutput(logSpy);

      expect(log.replace(/\n/g, '')).toEqual(
        expect.stringContaining(
          [
            '[ 카테고리 | 한식 | 양식 | 중식 | 중식 | 일식 ]',
            '[ 구구 | 김치찌개 | 스파게티 | 깐풍기 | 짜장면 | 우동 ]',
            '[ 제임스 | 제육볶음 | 라자냐 | 짬뽕 | 마파두부 | 스시 ]',
          ].join(''),
        ),
      );
    });

    test('못먹는 메뉴가 선택될 경우, 다시 뽑는다.', async () => {
      const logSpy = getLogSpy();

      mockRandoms([2, 5, 1, 3, 4]);
      mockQuestions(['구구,제임스', '김밥', '떡볶이']);

      const sequenced = (_, idx) => idx + 1;
      mockShuffles([
        // 구구
        [1, Array.from({ length: 9 }, sequenced)], // 못먹는 음식
        [1, Array.from({ length: 9 }, sequenced)], // 못먹는 음식
        [1, Array.from({ length: 9 }, sequenced)],
        [2, Array.from({ length: 9 }, sequenced)],
        [7, Array.from({ length: 9 }, sequenced)],
        [1, Array.from({ length: 9 }, sequenced)],
        [4, Array.from({ length: 9 }, sequenced)],
        [2, Array.from({ length: 9 }, sequenced)],

        // 제임스
        [9, Array.from({ length: 9 }, sequenced)],
        [1, Array.from({ length: 9 }, sequenced)],
        [5, Array.from({ length: 9 }, sequenced)],
        [5, Array.from({ length: 9 }, sequenced)],
        [4, Array.from({ length: 9 }, sequenced)],
      ]);

      const app = new App();
      await app.play();
      const log = getOutput(logSpy);

      expect(log.replace(/\n/g, '')).toEqual(
        expect.stringContaining(
          [
            '점심 메뉴 추천을 시작합니다.',
            '메뉴 추천 결과입니다.',
            '[ 구분 | 월요일 | 화요일 | 수요일 | 목요일 | 금요일 ]',
            '[ 카테고리 | 한식 | 양식 | 일식 | 중식 | 아시안 ]',
            '[ 구구 | 김치찌개 | 스파게티 | 규동 | 짜장면 | 카오 팟 ]',
            '[ 제임스 | 제육볶음 | 라자냐 | 가츠동 | 짬뽕 | 파인애플 볶음밥 ]',
            '추천을 완료했습니다.',
          ].join(''),
        ),
      );
    });

    test('한 주에 중복된 메뉴가 뽑힐 경우, 다시 뽑는다.', async () => {
      const logSpy = getLogSpy();

      mockRandoms([2, 5, 1, 3, 3]);
      mockQuestions(['구구,제임스', '김밥', '떡볶이']);

      const sequenced = (_, idx) => idx + 1;
      mockShuffles([
        // 구구
        [2, Array.from({ length: 9 }, sequenced)],
        [7, Array.from({ length: 9 }, sequenced)],
        [1, Array.from({ length: 9 }, sequenced)],
        [4, Array.from({ length: 9 }, sequenced)],
        [5, Array.from({ length: 9 }, sequenced)],

        // 제임스
        [9, Array.from({ length: 9 }, sequenced)],
        [1, Array.from({ length: 9 }, sequenced)],
        [5, Array.from({ length: 9 }, sequenced)],
        [5, Array.from({ length: 9 }, sequenced)],
        [4, Array.from({ length: 9 }, sequenced)],
      ]);

      const app = new App();
      await app.play();
      const log = getOutput(logSpy);

      expect(log.replace(/\n/g, '')).toEqual(
        expect.stringContaining(
          [
            '[ 카테고리 | 한식 | 양식 | 일식 | 중식 | 중식 ]',
            '[ 구구 | 김치찌개 | 스파게티 | 규동 | 짜장면 | 짬뽕 ]',
            '[ 제임스 | 제육볶음 | 라자냐 | 가츠동 | 짬뽕 | 짜장면 ]',
          ].join(''),
        ),
      );
    });
  });

  describe('예외 테스트', () => {
    test.each(['구미,미', '구미,구미호입니다'])(
      '코치의 이름이 2글자 이상 4글자가 아닌 경우 예외를 처리한다.',
      async (testInput) => {
        const logSpy = getLogSpy();
        mockRandoms([2, 5, 1, 3, 3]);
        mockQuestions([testInput, '구구,제임스', '김밥', '떡볶이']);
        const sequenced = (_, idx) => idx + 1;
        mockShuffles([
          // 구구
          [2, Array.from({ length: 9 }, sequenced)],
          [7, Array.from({ length: 9 }, sequenced)],
          [1, Array.from({ length: 9 }, sequenced)],
          [4, Array.from({ length: 9 }, sequenced)],
          [5, Array.from({ length: 9 }, sequenced)],
          // 제임스
          [9, Array.from({ length: 9 }, sequenced)],
          [1, Array.from({ length: 9 }, sequenced)],
          [5, Array.from({ length: 9 }, sequenced)],
          [5, Array.from({ length: 9 }, sequenced)],
          [4, Array.from({ length: 9 }, sequenced)],
        ]);
        const app = new App();
        await app.play();
        const log = getOutput(logSpy);
        expect(log.replace(/\n/g, '')).toEqual(expect.stringContaining(ERROR_MESSAGE.coach.length));
      },
    );

    test.each(['구구', '일일,이이,삼삼,사사,오오,육육'])(
      '코치가 2명 이상 5명 이하가 아닌 경우 예외를 처리한다.',
      async (testInput) => {
        const logSpy = getLogSpy();
        mockRandoms([2, 5, 1, 3, 3]);
        mockQuestions([testInput, '구구,제임스', '김밥', '떡볶이']);
        const sequenced = (_, idx) => idx + 1;
        mockShuffles([
          // 구구
          [2, Array.from({ length: 9 }, sequenced)],
          [7, Array.from({ length: 9 }, sequenced)],
          [1, Array.from({ length: 9 }, sequenced)],
          [4, Array.from({ length: 9 }, sequenced)],
          [5, Array.from({ length: 9 }, sequenced)],
          // 제임스
          [9, Array.from({ length: 9 }, sequenced)],
          [1, Array.from({ length: 9 }, sequenced)],
          [5, Array.from({ length: 9 }, sequenced)],
          [5, Array.from({ length: 9 }, sequenced)],
          [4, Array.from({ length: 9 }, sequenced)],
        ]);
        const app = new App();
        await app.play();
        const log = getOutput(logSpy);
        expect(log.replace(/\n/g, '')).toEqual(expect.stringContaining(ERROR_MESSAGE.coach.count));
      },
    );

    test.each(['구구,구구'])('중복되는 코치 이름이 있는 경우 예외를 처리한다.', async (testInput) => {
      const logSpy = getLogSpy();
      mockRandoms([2, 5, 1, 3, 3]);
      mockQuestions([testInput, '구구,제임스', '김밥', '떡볶이']);
      const sequenced = (_, idx) => idx + 1;
      mockShuffles([
        // 구구
        [2, Array.from({ length: 9 }, sequenced)],
        [7, Array.from({ length: 9 }, sequenced)],
        [1, Array.from({ length: 9 }, sequenced)],
        [4, Array.from({ length: 9 }, sequenced)],
        [5, Array.from({ length: 9 }, sequenced)],
        // 제임스
        [9, Array.from({ length: 9 }, sequenced)],
        [1, Array.from({ length: 9 }, sequenced)],
        [5, Array.from({ length: 9 }, sequenced)],
        [5, Array.from({ length: 9 }, sequenced)],
        [4, Array.from({ length: 9 }, sequenced)],
      ]);
      const app = new App();
      await app.play();
      const log = getOutput(logSpy);
      expect(log.replace(/\n/g, '')).toEqual(expect.stringContaining(ERROR_MESSAGE.coach.unique));
    });

    test.each([['규동,쌈밥,된장찌개', '된장찌개,불고기']])(
      '못먹는 메뉴가 0개 이상 2개 이하가 아닌 경우 예외를 처리한다.',
      async (...testInputs) => {
        const logSpy = getLogSpy();
        mockRandoms([2, 5, 1, 3, 3]);
        mockQuestions(['구구,제임스', ...testInputs, '된장찌개', '불고기']);
        const sequenced = (_, idx) => idx + 1;
        mockShuffles([
          // 구구
          [2, Array.from({ length: 9 }, sequenced)],
          [7, Array.from({ length: 9 }, sequenced)],
          [1, Array.from({ length: 9 }, sequenced)],
          [4, Array.from({ length: 9 }, sequenced)],
          [5, Array.from({ length: 9 }, sequenced)],
          // 제임스
          [9, Array.from({ length: 9 }, sequenced)],
          [1, Array.from({ length: 9 }, sequenced)],
          [5, Array.from({ length: 9 }, sequenced)],
          [5, Array.from({ length: 9 }, sequenced)],
          [4, Array.from({ length: 9 }, sequenced)],
        ]);
        const app = new App();
        await app.play();
        const log = getOutput(logSpy);
        expect(log.replace(/\n/g, '')).toEqual(expect.stringContaining(ERROR_MESSAGE.foodNotEat.count));
      },
    );

    test.each([
      ['가스', '활명소'],
      ['삼합', '회'],
    ])('메뉴판에 없는 메뉴를 입력한 경우 예외를 처리한다.', async (...testInputs) => {
      const logSpy = getLogSpy();
      mockRandoms([2, 5, 1, 3, 3]);
      mockQuestions(['구구,제임스', ...testInputs, '된장찌개', '불고기']);
      const sequenced = (_, idx) => idx + 1;
      mockShuffles([
        // 구구
        [2, Array.from({ length: 9 }, sequenced)],
        [7, Array.from({ length: 9 }, sequenced)],
        [1, Array.from({ length: 9 }, sequenced)],
        [4, Array.from({ length: 9 }, sequenced)],
        [5, Array.from({ length: 9 }, sequenced)],
        // 제임스
        [9, Array.from({ length: 9 }, sequenced)],
        [1, Array.from({ length: 9 }, sequenced)],
        [5, Array.from({ length: 9 }, sequenced)],
        [5, Array.from({ length: 9 }, sequenced)],
        [4, Array.from({ length: 9 }, sequenced)],
      ]);
      const app = new App();
      await app.play();
      const log = getOutput(logSpy);
      expect(log.replace(/\n/g, '')).toEqual(expect.stringContaining(ERROR_MESSAGE.foodNotEat.exist));
    });
  });
});
