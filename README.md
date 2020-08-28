# Start Intro React - what should I do?

: **React 공식 문서를 읽고, 핵심 키워드를 블로깅**하며, **프로젝트 하나를 실습**해 보는 시간이다. 

이번 시간에 해야 하는 일 중 가장 중요한 것, 그리고 가장 먼저 해야 할 일은 **React 의 공식문서에 익숙해 지기**인데, 그 이유는 공식문서가 우리가 React 를 개발하는 데 참고할 수 있는 가장 신뢰도 높은 문서이기 때문이다. 특히 **React 의 12가지 개념들 을** 유심히 보자.

그 다음은 **React 프로젝트를 하나 개발해 보기**이다. 공식문서에 예제들이 있는데, 그것을 활용하도록 하자.

마지막으로는 위의 핵심 개념 12개 중 하나 혹은 그 이상을 정리해 블로그에 올려보기이다. 다시 말 하지만, 하나가 아니어도 괜찮다. 여러개여도 상관이 없다. 

이 Sprint 는 React 를 이해하는 데 가장 중요한 sprint 로, 꼭 마무리하고 넘어갈 수 있도록 하자!

---

# Main concepts of `React`

리액트 공식 홈페이지의 "주요 개념" 을 참고하여 작성하는 문서입니다

[Hello World - React](https://ko.reactjs.org/docs/hello-world.html)

## 1. `JSX`

JavaScript 를 확장한 문법. 반드시 사용해야 하는 것은 아니나, 시각적으로(코드의 가독성을 위해) 더욱 도움이 되기에 공식문서에서는 사용을 권장하는 편이며, 에러 코드도 더욱 구체적으로 띄워준다고 한다. 

사용예시 1

```jsx
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

`element` 라는 인자 안에 `<h1>Hello, {name}</h1>` 라는 값을 할당하여 React 에서 사용하는 모습이다. 

또한, 중괄호( `{ }` , curly bracket) 안에는 JS 의 표현식 또한 사용할 수 있다

사용예시 2

```jsx
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

`{formatName(user)}` 라는 부분으로, 중괄호 안에 JS의 함수를 사용하여 함수를 실행하는 모습이다. 물론, 이런 JS 문법은 아까 말했던 것처럼 `{ }` 안에서만 사용할 수 있다. 

이 JSX 는 컴파일이 끝난 뒤 JS의 `Object`로 인식되기에 `if` 조건문이나 `for loop` 등에도 사용할 수 있고, 변수에 할당하거나, 인자로 받아들이는 것 등등 모두가 가능하다.

사용예시 3 - 조건문 안에서의 JSX 사용

```jsx
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

유의할 점은, JSX "내부" 에서는 조건문을 사용할 수 없고, IIFE 나 삼항연산자를 사용해야 한다는 사실이다.

```jsx
<div>props.name = "John"? (<h1>hi john!</h1>) : (<h1>oh you are not john</h1>)</div>
```

JSX 는 HTML 속성 설정 또한 가능하고, 또 `{ }` 를 사용하여 JS 표현식 또한 삽입이 가능하다.

사용예시 4 - HTML 속성 설정 및 중괄호를 통한 JS 표현식 삽입

```jsx
//HTML 속성 할당
const element = <div tabIndex="0"></div>;

//JS 표현식 삽입
const element = <img src={user.avatarUrl}></img>;
```

JSX 는 HTML 보다는 JS 에 가깝기 때문에, React DOM 은 HTML attribute 대신 `camelCase Property naming` 을 사용한다. 예시를 들자면 HTML 의 `class` 는 `className` 으로, `tabindex` 는 `tabIndex` 로 바뀐다.

기타 JSX 의 몇 가지 속성-성질들이 있다면

- 비어있는 태그의 경우 `< />` 형태로 닫아주어야 한다
- 자식을 포함할 수 있다 (태그 안의 태그 안의 태그... 가 가능)
- `XSS(Cross-Site-Scripting)`공격으로부터 안전하다 → 기본적으로 JSX 에 삽입된 모든 값을 렌더링 하기 전에 `escaping` 하기 때문에 가능한 일이며, application 단에서 명시적으로 작성되지 않은 값들은 무시되고 문자열로 변환된다.

JSX 는 객체를 표현한다. 이는 Babel 에서 JSX 코드를 변환할 때 사용하는 `React.createElement()` 와 관련이 있다. 

사용예시 5 - JSX 문법과 `React.createElement()` 를 이용한 문법

```jsx
//JSX 문법
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>);
```

```jsx
//React.createElement() 을 활용한 문법
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

createElement 는 버그가 없는 코드를 작성하기 위해 몇 가지 검사를 수행하고, 다음과 같은 객체를 생성한다

```jsx
// 주의: 다음 구조는 단순화되었습니다
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```

이러한 객체를 `React Element` 라고 하며, "화면에 이것들을 표시하겠다" 라는 설명이라고 볼 수 있으며, 이는 React 의 근간이 된다. 

---

## 2. Element Rendering

### ⚠️`Component` 와 `Element` 를 혼동하지 않게 주의하라!

`Component` 의 구성요소가 `Element` 이며, 둘은 명확히 다른 개념이기에 혼동하지 않도록 하자

`Element` 는 화면에 표시할 내용을 기술하는 요소이다. 이는 DOM 객체와는 달리 일반 객체(`Plain Object`) 이며, React DOM 은 React Element 와 일치하도록 DOM 을 업데이트 하는 역할을 담당한다.

```jsx
//element 의 예시
const element = <h1>Hello, world</h1>;
```

### DOM 에 `Element` 렌더링하기

우리가 HTML 을 작성할 때도 어떤 하나의 `<div>`에 여러가지 태그들을 넣는 것과 비슷하게, React App 을 만들 때도 일반적으로 `root DOM node` 하나를 기준으로 잡고 시작한다. 기존 App 에 React 를 통합하려는 경우 여러개의 root node 가 있을 수 있으나, 일반적으로는 하나이다. 

어떤 하나의 Element 를 root DOM node 에 전달하기 위해선 `ReactDOM.render()` 를 통해 전달하면 된다.

참고 : `ReactDOM.render()` 및 `ReactDOM` 문서

[ReactDOM - React](https://ko.reactjs.org/docs/react-dom.html#render)

사용예시 1 - Element 생성과 DOM으로의 전달

```jsx
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

### 렌더링 된 `Element` 업데이트 하기

React Element 는 `Plain Object` 이면서도 `Immutable Object`(불변객체) 이다. 엘리먼트를 생성한 후에는 해당 엘리먼트의 자식이나 속성을 변경할 수 없다. 유일한 업데이트 방법은 새로운 엘리먼트를 생성하여 이를 `ReactDOM.render()` 로 전달하는 것이다. 

사용예시 2 - `ReactDOM.render()` 로 Element 를 전달해 Element 업데이트 하기

```jsx
//1초마다 변경되는 시계를 React 로 구현한 코드
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
```

`tick` 이라는 함수를 만든 뒤,`setInterval` 이라는 함수의 `callback`을 통해 전달해 1초(1000ms) 마다 한 번씩 `root DOM node` 로 업데이트 된 element 를 전달하는 코드이다. 

그리고 이 `ReactDOM.render()` 를 통한 element 업데이트는 기존 element 와 새로운 element 를 비교하여 바뀐 부분만 동적으로 업데이트 한다. 
위의 코드에서 실질적으로 업데이트 되는 부분은 `new.Date().toLocaleTimeString()` 뿐이며, 이를 개발자 도구를 사용해 살펴보면 해당 부분만이 업데이트 되는 모습을 확인할 수 있다. 

- 현재 이 문서를 작성중인 notion 에서는 GIF 확인이 되지 않아 해당 탭의 링크를 대신 첨부 :

[엘리먼트 렌더링 - React](https://ko.reactjs.org/docs/rendering-elements.html#react-only-updates-whats-necessary)

---

## 3. `Component` and `Props`

`Component`와 가장 유사한 개념은 JS 의 함수이다. `Component` 는 UI 를 재사용 가능한 개별적인 여러 조각으로 나눈 것이며, `props` 라는 임의의 입력을 받은 후, 화면에 어떻게 표시되는지를 기술한 `React Element`를 반환한다.  그리고 위에도 말했듯, `Element` 는 `Component` 를 구성하는 하위 개념이다. 혼동하지 말자. 

또한 이 `component` 는 함수와 클래스, 두 가지 형태로 나타낼 수 있으며, 각각 `function component`, `class component` 라고 한다. 

### `function component`

사용예시 1 - 간단한 함수 컴포넌트

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

이 함수는 데이터를 가진 하나의 `props` 객체 인자를 받아 React Element 를 반환하는 컴포넌트이다. 이러한 Component 는 JS 의 함수형태이기에, "함수 컴포넌트" 라고 칭한다.

### `class component`

사용예시 2 - 간단한 클래스 컴포넌트, 사용예시 1의 함수와 동일한 기능을 수행한다

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

위에 적은 것처럼 앞에서 구현한 함수 컴포넌트와 동일한 기능을 수행하는 컴포넌트이다. `ES6 class` 를 통해서 만든 컴포넌트이기에 "클래스 컴포넌트" 라고 칭한다. 

### component rendering

사용예시 3 - element 의 선언과 component 의 사용 

```jsx
//function component
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

//element using component
const element = <Welcome name="Sara" />;

//render component 
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

React 는 위의 `Welcome` 이라는 사용자 정의 component 로 작성한 element 를 발견하면, JSX attribute 와 자식을 해당 component 에 단일 객체로 전달한다. 그 전달되는 객체가 `props`이다. 

component 를 만들고, 그 component 를 통해 선언한 element 가 render 되는 과정은 다음 단계들을 거친다.

1. `<Welcome name="Sara" />` element 로 `ReactDOM.render()` 를 호출한다.
2. React 는 `{name: 'Sara'}` 를 `props`로 하여 `Welcome` component 를 호출한다.
3. `Welcome` component 는 그 결과로 `<h1>Hello, Sara</h1>` 를 반환한다.
4. ReactDOM 은 `<h1>Hello, Sara</h1>`  Element 와 일치하도록 DOM 을 효율적으로 업데이트한다.

### ⚠️`Component Naming`  의 규칙

`element` 는 이름을 지을 때 `camelCase` 를 따랐지만, `component` 의 경우 대문자로 기술해 주어야 한다. 그 이유는 React 가 소문자로 시작하는 `component` 를 DOM tag 로 처리하기 때문이다. 

해당 규칙에 대한 자세한 내용 : JSX 이해하기

[JSX 이해하기 - React](https://ko.reactjs.org/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized)

### Component 합성

`Component` 는 자신의 출력에 다른 `Component` 를 참조할 수 있다. 이렇게 하면 버튼이라든지, 폼이라든지 하는 것들을 React 를 통해 구현하고, 다른 `Component` 안에서 또 사용할 수 있게 되며, 코드의 재활용성이 엄청나게 올라간다. 

사용예시 4 - component 합성, `Welcome` 이라는 `component` 를 `App` 이라는 `component` 안에서 재사용함

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

일반적으로 React App 은, `App` component 를 통해 여러가지 `component` 들을 관리해준다. 물론, 기존 App 에 React 를 통합하는 경우는 Bottom-Up 방식으로 거꾸로 작어해야 할 수도 있다. 

### Component 분할

하나의 `Component` 에 많은 기능을 때려붓지 말고, 적절히 기능을 분화해서 나눠주는 과정 또한 중요하다. 

사용예시 5 - `Comment` 라는 `component` 를 기능에 따라 분할하여 가독성을 높여주는 과정 

```jsx
//comment 를 구성하는 component, Comment
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

가령 이런 `component`가 존재한다고 치자. 이 `component`는 `autor`라는 객체, `text` 라는 문자열, 그리고 `date` 라는 날짜를 `props` 로 받아오고 있다. 
해당 컴포넌트는 너무 다양한 요소들이 존재하여 한 눈에 코드를 이해하기가 어렵다. 또, 변경해야 하는 상황에서도 변경하기 어려울 수 있으며, 각 구성요소를 개별적으로 재사용하기가 어렵다. 

이럴 때는 기능에 따른 `component` 분할을 통해 가독성을 올려줄 수 있다. 

우선 `Avatar` 를 렌더링하는 부분을 따로 떼어보자. 굳이 `Comment` 안에 있을 이유가 있는 것도 아닌 기능이다.

```jsx
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
```

그리고 이 떨어뜨린 컴포넌트를 다시 위의 `Comment`에다가 집어넣어준다.

```jsx
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} /> // this part has been changed
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

Avatar 와 `UserInfo`, `UserInfo-name` 을 렌더링하는 `UserInfo` 컴포넌트 또한 분화가 가능할 듯 하다.

```jsx
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
```

이렇게 만든 `UserInfo` 컴포넌트를 통해 코드를 재구성해보자

```jsx
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} /> // this part has been changed
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

`Comment` 의 코드가 이전보다 훨씬 간단해졌을 뿐만 아니라, `Avatar`와 `UserInfo` 컴포넌트를 다른 파일에서 다시 사용할 수도 있다. 
이는 큰 앱을 만들 때 정말 많은 도움이 되며, React 의 공식 문서는 그런 이유로 위에 적은 버튼과도 같이 자주 사용되는 UI 의 일부분들 (`Button`, `Panel`, `Avatar`) 및 UI 일부가 자체적으로 복잡한 부분(`App`, `FeedStory`, `Comment`) 또한 별도의 컴포넌트로 만들어 놓는 것을 권장하고 있다. 

> 처음에는 컴포넌트를 추출하는 작업이 지루해 보일 수 있습니다. 하지만 재사용 가능한 컴포넌트를 만들어 놓는 것은 더 큰 앱에서 작업할 때 두각을 나타냅니다. UI 일부가 여러 번 사용되거나 (Button, Panel, Avatar), UI 일부가 자체적으로 복잡한 (App, FeedStory, Comment) 경우에는 별도의 컴포넌트로 만드는 게 좋습니다.

[Components and Props - React](https://ko.reactjs.org/docs/components-and-props.html#extracting-components)

### props 는 읽기 전용

함수 컴포넌트나 클래스 컴포넌트 모두 컴포넌트의 자체 props 를 수정하려 해서는 안 됨

사용예시 6 - 순수 함수를 다루듯 props 를 다루는 것을 권장하는 React 측의 설명

```jsx
//순수 함수의 예시
function sum(a, b) {
  return a + b;
}
```

해당 `sum` 함수는 동일한 입력값에 대한 동일한 결과를 반환하는 "순수함수" 이다.

```jsx
function withdraw(account, amount) {
  account.total -= amount;
}
```

그러나 이 `withdraw` 함수는 자신의 입력값을 변경하기 때문에 순수함수가 아니다.

**React 컴포넌트는 자신의 props 를 다룰 때, 반드시 순수 함수처럼 작동해야 한다**

---

## 5. State and Life Cycle

`Component` 안의 `state` 와 `life cycle` 에 대해 소개하는 단락

아까 구현하였던 1초마다 째깍거리는 시계를 위의 개념을 통해 재사용 할 수 있게 만들고, 캡슐화를 진행할 것이다.

```jsx
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(tick, 1000); 
```

일단 저 `<h2>It is {new Date().toLocaleTimeString()}.</h2>` 부분을 캡슐화 할 수 있을 듯 하다. 

사용예시 1 - 캡슐화 된 `Clock` 컴포넌트 

```jsx
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

그러나 여기서는 `tick` 부분만 재실행을 하고 있지, `Clock` 이라는 컴포넌트 자체는 모듈화하지 못 하였다. "1초마다 째깍거리는 시계" 그 자체를 전부 모듈화 하고싶다. 

이를 위해선 `Clock` 컴포넌트에 `state` 를 추가해야 하며, 함수형으로 만든 컴포넌트를 클래스 컴포넌트로 바꾸는 과정이 필요하다. 그 이유는, 앞에서 말했듯이 `state` 를 이용하기 위해선 클래스 컴포넌트로 구성해야 하니깐.

### 함수 컴포넌트에서 클래스 컴포넌트로 변환하기

1. `React.Component`를 확장하는 동일한 이름의 [ES6 class](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes)를 생성합니다.
2. `render()`라고 불리는 빈 메서드를 추가합니다.
3. 함수의 내용을 `render()` 메서드 안으로 옮깁니다.
4. `render()` 내용 안에 있는 `props`를 `this.props`로 변경합니다.
5. 남아있는 빈 함수 선언을 삭제합니다.

위의 다섯개의 과정을 거치면 함수형 컴포넌트를 클래스 컴포넌트로 바꿀 수 있다. 

사용예시 2 - 클래스형 컴포넌트로 바꾼 `Clock` 컴포넌트 

```jsx
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

### 클래스에 로컬 `state` 추가하기

사용예시 3 - `state` 를 추가한 `Clock` 컴포넌트 

```jsx
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

먼저, `render()` 안에 있는 `[this.props.date](http://this.props.date)` 를 `[this.state.date](http://this.state.date)` 로 변경한다

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

그리고 `this.state` 를 지정하는 `class constructor` 를 추가한다

```jsx
constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
```

여기서 `props` 를 넘겨받을 때, `super` 를 통해 호출하여 넘겨받는 것을 잘 보라

```jsx
// 주의: 다음 구조는 단순화되었습니다
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```

위에 적었던 것처럼, `props` 라는 객체가 형성되고, 그 안에 값들이 key-value 로 들어간다. `React.Component` 라는 원시 클래스로부터 상속받은 `props` 라는 값을 `Clock` 이라는 컴포넌트가 상속받는 형식으로 `props` 가 전달되고 있다. 클래스 컴포넌트에서 `props` 를 사용하기 위해서는 항상 `constructor(props)` 와 `super(props)` 를 이용해 기본 생성자를 호출해야 하는 사실을 잊지 말자. 

그리고, `date` prop 을 `Clock` 으로부터 삭제해준다

```jsx
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

Timer 코드는 나중에 다시 컴포넌트로 추가할 예정이며, 지금까지 완성된 코드는 이러하다

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
```

### 생명주기 메서드(`life cycle method`) 를 클래스에 추가하기

많은 컴포넌트가 있는 앱에서 컴포넌트가 삭제될 때 해당 컴포넌트가 사용중인 자원을 넘겨받아 마저 수행할 수 있도록 코드를 설계하는 것은 매우 중요하다. 

마저 시계 이야기로 돌아가자면, `Clock` 이 맨 처음 `DOM` 에 렌더링 될 때마다 우리는 타이머를 설정하려고 한다(이를 React 에서는 "마운팅" 이라고 한다)

그리고 `Clock`에 의해 생성된 `DOM` 이 삭제될 때마다 그 타이머를 해제하려고 한다 (이를 React 에서는 "언마운팅" 이라고 한다)

컴포넌트 클래스에서는 특별한 메서드를 선언하여 컴포넌트가 마운트 될 때, 그리고 언마운트 될때, 일부 코드를 작동시킬 수 있다. 

사용예시 1 - 생명주기 메서드의 boiler plating

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

저기에 새로 추가된 `componentDidMount()` 와 `componentWillUnmount()` 가 바로 생명주기 메서드이다. 

사용예시 2 - `componentDidMount()` 를 통해 `Clock` 컴포넌트로 생성된 출력물이 `DOM` 에 렌더링 된 뒤 특정 코드를 실행하기

```jsx
componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
```

`this.timerID` 라는, 데이터 흐름에 영향을 미치지 않아 밖으로 빼도 되는 부분은 이렇게 `state` 와 별도로 빼 놓고 코드를 작성할 수 있다. 그리고 잘 보면, `this.timerID` 에 값을 넘겨주는 방식은, `setInterval` 이라는 함수에 첫 번째 인자로는 `this.tick()` 을 넘겨주고, 두 번째 인자로는 `1000` 을 넘겨주고 있다. 

즉, DOM 에 `Clock` 이라는 컴포넌트가 마운트 될 때 `timerID` 라는 곳에 (이 `this` 는 `componentDidMount()` 에 스코프가 걸려있다) 해당 함수를 넘겨주는 것이다. 

사용예시 3 - `componentWillUnmount()` 에서  `Clock` 컴포넌트로 생성된 출력물이 DOM으로부터 삭제될 때마다 특정 코드를 실행하기

```jsx
componentWillUnmount() {
    clearInterval(this.timerID);
  }
```

만약 DOM 으로부터 `Clock` 컴포넌트로 만든 결과물이 언마운트 되면, `clearInterval` 메서드를 통해 `this.timerID` 를 날려준다.

clearInterval 에 대한 MDN 문서 : 

[WindowOrWorkerGlobalScope.clearInterval()](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearInterval)

마지막으로는 사용예시 2에서 사용한 `tick()` 이라는 시계를 업데이트 해주는 메서드를 구현해보자

사용예시 4 - `tick()` 메서드 구현

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

이제 클래스 컴포넌트 로 완성한, 그 자체로 재활용이 가능한 `Clock`컴포넌트가 완성되었다. 

현재 어떠한 상황인지, 그리고 이렇게 만든 컴포넌트와 그 컴포넌트의 렌더링이 되는 과정들을 짚고 넘어가보자

1. `<Clock />`가 `ReactDOM.render()`로 전달되었을 때 React는 `Clock` 컴포넌트의 constructor를 호출합니다. `Clock`이 현재 시각을 표시해야 하기 때문에 현재 시각이 포함된 객체로 `this.state`를 초기화합니다. 나중에 이 state를 업데이트할 것입니다.
2. React는 `Clock` 컴포넌트의 `render()` 메서드를 호출합니다. 이를 통해 React는 화면에 표시되어야 할 내용을 알게 됩니다. 그 다음 React는 `Clock`의 렌더링 출력값을 일치시키기 위해 DOM을 업데이트합니다.
3. `Clock` 출력값이 DOM에 삽입되면, React는 `componentDidMount()` 생명주기 메서드를 호출합니다. 그 안에서 `Clock` 컴포넌트는 매초 컴포넌트의 `tick()` 메서드를 호출하기 위한 타이머를 설정하도록 브라우저에 요청합니다.
4. 매초 브라우저가 `tick()` 메서드를 호출합니다. 그 안에서 `Clock` 컴포넌트는 `setState()`에 현재 시각을 포함하는 객체를 호출하면서 UI 업데이트를 진행합니다. `setState()` 호출 덕분에 React는 state가 변경된 것을 인지하고 화면에 표시될 내용을 알아내기 위해 `render()` 메서드를 다시 호출합니다. 이 때 `render()` 메서드 안의 `this.state.date`가 달라지고 렌더링 출력값은 업데이트된 시각을 포함합니다. React는 이에 따라 DOM을 업데이트합니다.
5. `Clock` 컴포넌트가 DOM으로부터 한 번이라도 삭제된 적이 있다면 React는 타이머를 멈추기 위해 `componentWillUnmount()` 생명주기 메서드를 호출합니다.

### `state` 를 올바로 사용하기

- 직접 state 를 수정하지 않는다

```jsx
// Wrong
this.state.comment = 'Hello';
```

이렇게 `state` 에 직접 접근하는 것으론 컴포넌트를 다시 렌더링 할 수 없다

```jsx
// Correct
this.setState({comment: 'Hello'});
```

`setState()` 를 사용해야만 `state` 가 업데이트 되고, 그리고 컴포넌트가 다시 렌더링된다.

새로운 state 를 추가하는 일도 당연히 안 된다. 만약 추가해주고 싶다면, `constructor` 에서 하는 수 밖에 없다. 

- `state` 업데이트는 비동기적일 수 있다

React 가 성능을 위해 여러가지 `setState()` 호출을 모았다가 한 번에 처리할 수 있다. 다음 `state` 를 계산할 때 해당 값에 의존해서는 안 된다. 

```jsx
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

이런 값은 실패할 수 있다. 위에서 말 했듯, React 의 비동기적인 처리가 이뤄질 수 있어 계속해서 카운터가 업데이트 될 것이라는 걸 보장할 수 없다.

대신, 함수를 인자로 전달하는 다른 형태의 `setState()` 를 사용한다.

```jsx
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

이 함수는 이전 `state` 를 첫 번째 인자로, 그리고 업데이트가 적용된 시점의 `props` 를 두 번째 인자로 받아들인다. 성능 문제로 인해 비동기적인 처리가 이뤄질 수 있어 이전 값에 의존하는 것은 예상치 못한 결과를 낳을 수 있으니,  함수를 통한 `setState` 를 활용하자. 

- `setState()`는 병합된다

`setState()` 를 호출할 때마다 React 는 제공한 객체를 현재 `state` 로 병합한다

```jsx
constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```

이런 `state` 를 생성하는 생성자가 있다고 가정하고

```jsx
componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```

이렇게 두 개의 `setState()` 요청을 실행하면, 서로간에 영향을 주지 않고 독립적으로 상태를 갱신할 수 있다. 병합은 얕게 이뤄지기 때문에 `this.setState({comments})`가 `this.state.posts` 에는 영향을 주지 않지만, `this.state.comments` 는 완전히 대체된다.

- 데이터는 아래로 흐른다

부모나 자식 컴포넌트가 특정 컴포넌트가 유상태인지/무상태인지는 알 수가 없다. 그리고 전혀 알 필요가 없다. 함수나 클래스로 정의되었는지도 고려하지 않아도 된다. `**state` 가 소유하고 설정한 컴포넌트 이외에는 어떠한 컴포넌트에도 접근할 수 없다.** 

컴포넌트는 자신의 `state`를 자식 컴포넌트에 `props`로 전달할 수 있다. 

```jsx
<FormattedDate date={this.state.date} />
```

이렇게 되면, `FormattedDate` 컴포넌트는 `date` 를 자신의 props 로 받게 될 것이고, 이것이 `Clock`컴포넌트의 `state` 에서 온 것인지, 혹은 `props`에서 온 건지, 혹은 수동으로 입력한 것인지를 알지 못 한다. 

```jsx
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```

이는 하향식, 단방향식 데이터 흐름이라고 한다. 모든 `state` 는 항상 특정한 컴포넌트가 소유하고 있으며, 그 `state` 로부터 파생된 UI 나 데이터는 트리구조에서 "자신의 아래" 에 있는, 자식 컴포넌트에게만 영향을 미친다. 

---

## 6. 이벤트 처리하기

`React` 의 이벤트 처리는 `JSX` 를 이용해서 문자열이 아닌 함수를 통해 이벤트 핸들러를 전달하는 방식으로 이뤄진다.  원래대로라면 `addEventListener` 를 호출하겠지만, React 의 경우 렌더링 될 때 리스너를 제공하는 방식으로 해결한다. 

```jsx
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // 콜백에서 `this`가 작동하려면 아래와 같이 바인딩 해주어야 합니다.
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

특히 저 안의 코드인`this.handleClick = this.handleClick.bind(this);` 에 유의해야 한다. 클래스 메서드는 기본적으로 바인딩 되어있지 않다. 해당 구문을 통해 `bind` 를 해 주지 않는다면, `this` 는 `undefined` 가 된다. 즉, 해당 구문은 `handleClick` 의 scope 를 우리가 만드는 `Toggle` 에다가 걸어주는 구문인 것이다.

물론, 이런 바인딩을 굳이 명시해주지 않아도 사용할 수 있는 방법들이 존재한다.

```jsx
class LoggingButton extends React.Component {
  // 이 문법은 `this`가 handleClick 내에서 바인딩되도록 합니다.
  // 주의: 이 문법은 *실험적인* 문법입니다.
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

첫 번째 방법은 클래스 내에서 이벤트 핸들러를  `arrow function` 을 통해 자동으로 바인딩을 해 주는 방법이다. 물론, 주석에 나와있는 것처럼 "실험적인" 문법이라고 한다. 

또 다른 방법으로는 `callback` 내부에서 `arrow function` 을 활용하는 방법이 있다.

```jsx
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // 이 문법은 `this`가 handleClick 내에서 바인딩되도록 합니다.
    return (
      <button onClick={() => this.handleClick()}>
        Click me
      </button>
    );
  }
}
```

물론 이 방법의 단점 또한 존재한다. `LoggingButton` 이 렌더링 될 때마다 매번 다른 콜백이 생성된다는 점이다. 이 콜백이 하위 컴포넌트들에 전달되는 경우, 전달받은 컴포넌들은 추가로 렌더링을 하게 되고, 성능의 저하가 생길 수 있다. 

그렇기 때문에 리액트 공식 문서에서는 

1. 생성자 안에서 바인딩하기
2. `class field syntax` 의 사용

을 권장하고 있다. 

### 자식 컴포넌트에게 이벤트 핸들러 넘겨주기

`props` 를 통해 넘겨줄 수 있다. 위에서 구현한 코드를 기반으로 만들어본다면, 다음과 같다.

부모 컴포넌트

```jsx
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // 콜백에서 `this`가 작동하려면 아래와 같이 바인딩 해주어야 합니다.
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <>
        <button onClick={this.handleClick}>
          {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
        <Child name="hi" handler={this.handleClick}/> 
				//해당 부분에서 handler 로 handleClick 이라는 이벤트핸들러를 넘겨주고 있다.
      </>
    );
  }
}
```

자식 컴포넌트 

```jsx
import React from 'react';

// return event handler to child component
function Child(props) {
    return ( 
    <>
        <div>i got name {props.name}</div>
        <button onClick={props.handler}>Button</button>
				// Child component 는 이런 식으로 넘겨받을 수 있다. 
    </>
    
    )
};

export default Child
```

## 7. 조건부 렌더링

애플리케이션의 상태에 기반한 조건문을 통해, 조건문에 따라 컴포넌트 중 일부만을 렌더링 할 수 있는 기능을 소개하는 문서이다. JS 의 `if`, 혹은 삼항연산자를 응용할 수 있다. 

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={true} />,
  document.getElementById('root')
);
```

저렇게 `props` 로 받은 어떤 값을 조건문에 활용하여, 어떤 컴포넌트를 렌더링할 지 정할 수 있다. 

### 엘리먼트 변수를 사용한 조건부 렌더링

출력의 다른 부분은 변하지 않고, 컴포넌트의 일부만을 조건부로 렌더링 할 수 있다.

```jsx
//index.js file 

import React from 'react';
import ReactDOM from 'react-dom';
import {LoginButton, LogoutButton, Greeting} from './Child';

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    // binding
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {
      isLoggedIn: true
    }
  }

  handleLoginClick() {
    this.setState(state => ({
      isLoggedIn: true
    }));
  }

  handleLogoutClick() {
    this.setState(state => ({
      isLoggedIn: false
    }));
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick}/>
    } else {
      button = <LoginButton onClick={this.handleLoginClick}/>
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }

  
}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <LoginControl />,
  document.getElementById('root')
);
```

```jsx
//Child.js file
import React from 'react';

function LoginButton(props) {
    return (
      <button onClick={props.onClick}>
        Login
      </button>
    );
}
  
  function LogoutButton(props) {
    return (
      <button onClick={props.onClick}>
        Logout
      </button>
    );
}

function UserGreeting(props) {
    return <h1>Welcome back!</h1>;
}
  
  function GuestGreeting(props) {
    return <h1>Please sign up.</h1>;
}

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
      return <UserGreeting />;
    }
    return <GuestGreeting />;
}

export {LoginButton, LogoutButton, Greeting};
```

위처럼 컴포넌트 안에서 조건문을 통한 렌더링을 사용할 수도 있다. 

물론, 삼항연산자를 통해 인라인 렌더링도 가능하다.

```jsx
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```

본인이, 혹은 같이 작업하는 사람들이 가독성이 좋다고 생각하는 방식을 취사선택하면 된다. 조건이 너무 복잡하다면, 컴포넌트를 분리하는 걸 고려해보자. 

### 렌더링 하는 것을 막기

CSS 의 `display` 를 사용할 수도 있겠지만, 리액트에서는 조금 더 간단하게 해결할 수 있다. 조건문을 걸어주고 조건문이 충족되지 않을 때 `null` 을 return 해주면 된다. 

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
// import {LoginButton, LogoutButton, Greeting} from './Child';

function WarningBanner(props) {
  if (!props.warn) {
    return null; //like this. check props.warn then render element by this value
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```

```jsx
function WarningBanner(props) {
  if (!props.warn) {
    return null; //like this. check props.warn then render element by this value
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}
```

그 중에서도 특히 `WarningBanner` 는 만약 `props` 로 받은 `warn` 의 값이 `true` 이면 `null` 을 return 하는데, 컴포넌트가 `null` 을 `return` 한다면 해당 컴포넌트를 `render` 했을 경우 아무것도 그려지지 않는다. 그리고 이는 생명주기 메서드 흐름에 영향을 주지 않는다. `null` 을 return 해도, `componentDidUpdate` 가 계속 호출되는 것이 그 예이다. 

## 8. 리스트와 key

### JS 에서의 `map` 의 사용

```jsx
const numbers = [1, 2, 3, 4];
const dobuled = numbers.map(arg => arg * 2);
console.log(doubled);
```

우리가 일반적으로 `map` 을 사용하는 방식이다. React 도 배열을 통해 엘리먼트 리스트를 만들 수 있다.

### React 에서의 리스트 렌더링

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
// import {LoginButton, LogoutButton, Greeting} from './Child';

function List() {
  const numbers = [1, 2, 3, 4]
  return (
    numbers.map(arg => {
      return <div>{arg}</div>
    })
  )
}

ReactDOM.render(
  <List />,
  document.getElementById('root')
);
```

먼저, 이런 식으로 해 주는 것도 가능하다. `List` 라는 컴포넌트를 렌더링하는데, 해당 컴포넌트는 `map` 을 사용하여 `<div>arg</div>` 를 return 하고있다. 

아니면 아얘 태그가 담긴 배열 자체를 렌더링 할 수도 있다.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
// import {LoginButton, LogoutButton, Greeting} from './Child';

const numbers = [1, 2, 3, 4]
const listItems = numbers.map(arg => {return <div>{arg}</div>})

ReactDOM.render(
  <div>{listItems}</div>,
  document.getElementById('root')
);
```

위와 동일한 기능을 하는 코드를 다른 방식으로 작성했다. `listItems` 라는 태그가 담긴 배열을 만들어주고, 그 배열 자체를 렌더링을 해도 상관없다. 

### 기본적인 리스트 컴포넌트

---

# Check Point Solution

오늘 반드시 짚고 넘어가야 할 키워드

- Props
- State
- Life Cycle

## React 를 사용하는 이유

- 생산 및 유지보수를 더욱 용이하게 할 수 있다
- 난잡한 DOM 메서드의 사용으로 코드의 가독성이 떨어지는 걸 Virtual DOM 이라는 개념을 사용해 더 깔끔하게 만든다
    - virtual DOM 이란 것은 변경된 부분이 있는지를 감지하여 변경된 부분만을 새로 rendering 하는 React 의 특징이다. Front-End 의 성능을 올려줄 수 있다.

## React 의 특징

### Declarative

명령형 : 과정을 하나하나 명시해준다, 어딘가를 찾아갈 때 어디에서 좌회전, 어디에서 우회전 등등을 이야기하는 방식이 명령형이다.

선언형 : 그냥 목표만을 말해준다, 주소 체계를 알고 있으면 "내 집은 남양주 별내동 XXX이다" 라고 말하고 그리로 찾아오게끔 하는 방식이 선언형이다.

React 는 선언형이다. 기존의 DOM 메서드에서는 `createElement`, `appendChild`등의 과정을 하나하나 다 명시해주어야 하지만, React 에서는 그냥 HTML 처럼 코드를 작성하면 해당 과정들이 다 함축된 채로 작동된다. 

### Component Based

우리가 자주 사용하는 HTML 의 묶음들을 하나의 Block 으로 만든 `Component` 라는 개념에 근간한 프레임워크이기 때문에 재사용성이 높아진다. 

### learn once, write anywhere

웹 앱 뿐만이 아니라 모바일 앱도 개발이 가능해서(`React Native`), 한 번 알면 모바일에서도 웹에서도 사용할 수 있다는 React 의 특징을 설명한다. 

## class component vs function component

`class` 의 경우 반드시 `render()` 가 있어야 한다. 생각해보면 쉽다. `ES6 class` 문법을 사용할 때 우리가 `return` 을 사용하진 않는다. 

## JSX

- JSX 는 모든 HTML block 들을 하나의 태그로 감싸주어야 한다
- `return` 은 단 하나의 element 만을 return 할 수 있다. 여러 개를 `return`하고 싶으면?
    - `[ element1, element2 ]` , 와 같이 배열을 통해서 `return` 하면 된다
    - `<div>`라는 하나의 태그로 전부 감싸서 `return` 하면 된다 → 그러나 불필요한 <div> 를 넣기 싫다면 `<>element1, element2, element3</>` 과 같은 방식을 사용하면 된다.
    - `fragment` 를 사용해도 된다. `<React.fragment>element1, element2, element3</React.fragment>` 와 같은 형식으로 사용해주면 된다.
    - 추가하자면, 위의 `<>element1, element2, element3</>` 의 빈 태그를 활용하는 방법은 `<React.fragment>element1, element2, element3</React.fragment>` 의 축약형이다.

## State

말 그대로 "상태" 이다. 설문지에서 나오는 그런 것들. 결혼의 여부, 취업의 여부, 연애의 여부 등등 우리 일상속에서의 상태에 대한 예시는 많이 찾아볼 수 있다. 

웹에서의 예시는 토글 스위치, 그리고 `counter component` 등(+ 를 누르면 1씩 증가, -를 누르면 1씩 감소) 등등이 있을 수 있다. 그 외에도 `enum` 이라는 열거자료형 등등이 있을 수 있다

### State of React

하나의 앱에서는 여러가지 상태가 있을 수 있다. 이 상태를 담는 것이 `this.state` 그리고 이를 변화시키는 게 `setState()` 메서드이다.

### 속성(`props`)과 상태(`state`)

- 속성 : **변하지 않음**, 처음으로 생성될 때 부여받은 어떠한 무언가. React 에서 `props` 는 읽기 전용이다.
- 상태 : **변할 수 있음**, 변할 수 있음, React 에서 `state` 는 `setState()` 를 통해 바꾸어 줄 수 있다.

## Life Cycle

### `componentDidMount()`, `componentDidUpdate()`, `componentWillUnmount()`

`component` 를 사람으로 치자면 저 메서드들은 각각 "태어날 때", "어떠한 변화가 일어날 때", "죽기 직전" 정도로 치환할 수 있겠다. 태어날 때 ~한 일들을 해 줘라, 어떠한 변화가 일어날 때 ~한 일들을 해줘라, 그리고 죽기 직전에 ~한 일들을 해 줘라 등으로 해석하면 이해가 더 편하다. `constructor` 는 음... "임신할 때" 쯤으로 해석하면 되겠다. 이에 대해서 조금 더 알고싶으면 `React Life Cycle Diagram` 으로 검색을 하면 나오는 웹페이지가 있는데 그 웹페이지를 참조해 보도록 하자. 

이제 이것을 명확하게 React 를 가지고 말을 해 보자. 생성자로 인해 컴포넌트가 생성되고, 그 컴포넌트가 렌더링 되어 화면 위에 그려진다. 그러면 `componentDidMount()` 가 호출된다. 그리고 컴포넌트의 상태가 변경된다. 그 때는 `componentDidUpdate()` 가 호출된다. 마지막으로 해당 컴포넌트가 이제 화면에서 더 이상 렌더링 되지 않는 경우, 즉 사라지는 경우, 그 직전에 `componentWillUnmount()` 가 호출된다. 

JS 스타일로 이해하려면 컴포넌트 자체를 하나의 클래스 단위로 보고, 렌더링 된 컴포넌트들을 하나의 인스턴스로 보면 편하다. 

### function component 의 life cycle method

함수 컴포넌트 또한 Life Cycle 가 존재한다. 그러나 우리가 직접 컨트롤 할 수는 없다. 만약 Life Cycle 메서드를 이용하고 싶다면 `Class Component` 를 통해서 접근해야 한다.

## State syntax

문서에서 보았듯이 **절대로 state 를 직접 변경해서는 안 된다.** 상태가 바뀌어야 렌더링이 되는데 이렇게 하는 경우 Life Cycle 를 타지 않는다. 그래서 `componentDidUpdate()` 가 실행이 되지 않아 렌더링이 되지 않는다. 실제로 한 번 해보자. 
