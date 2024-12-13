## 🏄🏼‍♂️ 프로젝트 소개

<!-- 어떤 프로젝트인지, 주요 기능이 무엇인지 작성한다. -->

## 🤸‍♀️ 코드 설명

### 1. MVC패턴

> MVC패턴
> : Controller가 주축이 되어 Model과 View를 연결한다. Model은 데이터에 대한 관리만, View는 사용자의 입출력만을 담당한다.
>
> #### 특징
>
> 1. Model은 View와 Controller에 의존하지 않는다.
> 2. View는 필요에 따라 Model를 주입받을 수 있으며, Controller에 의존하지 않는다.
> 3. Controller는 Model과 View을 이용하여 프로그램의 흐름을 담당한다.

1. [Model](./src/models/) : 데이터를 관리합니다.

   1. `Model` : 에 대한 데이터를 관리합니다.

2. [View](./src/views/) : 사용자의 입출력을 담당합니다.

   1. `InputView` : 사용자로부터 입력을 받습니다.
   2. `OutputView` : 사용자에게 결과를 출력합니다.

3. [Controller](./src/controllers/) : Model과 View를 연결하여 프로그램의 전체적인 흐름을 담당합니다.

   1. `Controller` : 프로그램의 전반적인 흐름을 담당합니다.

4. [helpers](./src/helpers/) : 핼퍼 객체이며 주로 View에서 필요한 기능을 담당합니다.
   1. `InputParser` : 사용자의 입력을 받았을 때 이를 가공하여 반환합니다.
   2. `InputValidator` : 사용자의 입력을 받았을 때 유효성 검사를 수행합니다.

### 2. 테스트

App의 테스트 코드는 `__tests__`폴더에 있고, 그 외의 테스트 코드는 각 파일이 위치한 폴더에 함께 위치해있습니다. 이렇게 테스트 코드 파일과 객체 파일을 함께 둔 이유는 응집성때문입니다. 이 둘이 멀리 떨어져있으면 물리적으로 떨어져 더 손이 안가게되고, 점점 관리를 안하게 될 것이라 판단하여 같은 폴더에 배치했습니다.

클래스에 대한 테스트 코드는 Model에 대한 테스트만 작성했습니다. Controller와 View는 다른 객체와의 의존성이 너무 강하고 애플리케이션에 대한 테스트로 충분히 대체가 가능하다고 생각했습니다.

1. `ApplicationTest` : 애플리케이션의 테스트 코드
2. `Model.spec.js` : Model의 테스트 코드

### 3. 라이브러리

lib 폴더에서 확인할 수 있습니다. 애플리케이션 혹은 테스트에 필요한 유틸이나 상수를 관리합니다.

1. [constants](./src/lib/constants.js) : 애플리케이션에서 사용하는 상수
2. [utils](./src/lib/utils.js) : 애플리케이션에서 사용하는 유틸 함수
3. [test/testUtils](./src/lib/testUtils.js) : 테스트할 때 사용하는 유틸 함수

## 🔨 기능 구현 목록

1.
2.
3.

### 주의 사항

1.
