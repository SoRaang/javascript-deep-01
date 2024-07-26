// 기본 클래스

class CalcRect {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    getPerimeter() {
        return 2 * (this.width + this.height);
    }

    getArea() {
        return this.width * this.height;
    }
}

const myRect = new CalcRect(135, 270);



// 종속 클래스

class Square extends CalcRect {
    constructor(length) {
        super(length, length); // 상위 클래스의 생성자를 참조한다
    }
}

const mySquare = new Square(10, 20);



// private 속성과 메소드

class IsSquare {
    #length // 2. 해당 속성을 private 속성으로 사용하겠다고 선언한다.

    constructor(length) {
        if (length <= 0) {
            throw '입력된 길이가 0보다 작습니다.' // 1. 이 방법으로 잘못된 값의 최초 생성은 막을 수 있지만, 사용자가 값을 변경하는 것은 막을 수 없다.
        }

        this.#length = length; // 3. 해당 private 속성을 설정한다.
    }

    getPerimeter() {
        return 4 * this.#length;
    }

    getArea() {
        return this.#length * this.#length;
    }
}

const underSquare = new IsSquare(30);

underSquare.length = -30; // private 속성으로 지정되었기 때문에, 변경되지는 않는다. length 라는 속성이 추가된다.

console.log(underSquare.getPerimeter());



// class의 getter와 setter

class AnotherSquare {
    #length

    constructor(length) {
        this.length = length;
    }

    get length() { // getter
        return this.#length;
    }

    get perimeter() {
        return this.#length * 4;
    }

    get area() {
        return this.#length * this.#length;
    }

    set length(length) { // setter
        if (length <= 0) {
            throw '길이는 0보다 커야 합니다.'
        }

        this.#length = length;
    }
}

const anonSquare = new AnotherSquare(20);

// 값이 호출되면 자동으로 getter와 setter가 호출된다.

console.log(`한 변의 길이는 ${ anonSquare.length }입니다.`);
console.log(`둘레는 ${ anonSquare.perimeter }입니다.`);
console.log(`넓이는 ${ anonSquare.area }입니다.`);

// anonSquare.length = -50; // 자동으로 setter를 호출하면서 예외 처리가 되어 값이 변경되지 않는다.



// static 속성과 메소드

class StatSquare {
    #length

    static stField = 3.14; // static field라고 부른다.
    static #counter = 0; // static private으로 StatSquare 클래스의 속성을 지정한다.
    static get counter() { // getter를 설정하여 class의 static 속성에 접근할 수 있게 한다.
        return StatSquare.#counter;
    }

    constructor(length) {
        this.length = length;
        StatSquare.#counter += 1;
    }

    static perimeterOf(length) { // class 자체에서 작동하는 function이다.
        return length * 4;
    }

    static areaOf(length) { // class 자체에서 작동하는 function이다.
        return length * length;
    }

    get length() {
        return this.#length;
    }

    get perimeter() {
        return this.#length * 4;
    }

    get area() {
        return this.#length * this.#length;
    }

    set length(length) {
        if (length < 0) {
            throw '길이는 0보다 커야 합니다.';
        }

        this.#length = length;
    }
}

const sqA = new StatSquare(10);
const sqB = new StatSquare(20);
const sqC = new StatSquare(30);

console.log(`지금까지 생성된 StatSquare 인스턴스는 ${ StatSquare.counter }개 입니다.`); // 위에서 생성한 sqA, sqB, sqC의 기록을 갖고 있다.
console.log(`한 변의 길이가 50인 정사각형의 둘레는 ${ StatSquare.perimeterOf(50) }입니다.`); // new StatSquare 로 선언하지 않아도 class가 가지고 있는 기능을 사용할 수 있다.
console.log(`한 변의 길이가 30인 정사각형의 둘레는 ${ StatSquare.areaOf(30) }입니다.`);



// 종속 클래스의 오버라이드

class LifeCycle {
    call() {
        this.a();
        this.b();
        this.c();
    }

    a() { console.log('a 메소드 호출') }
    b() { console.log('b 메소드 호출') }
    c() { console.log('c 메소드 호출') }
}

class LifeChild extends LifeCycle {
    a() {
        console.log('종속 클래스의 a 메소드');
    }
}

new LifeChild().call();



// Javascript의 기본 메소드인 toString() 메소드를 오버라이드

class Pet {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    toString() { // 기본 명령어를 오버라이드 한다.
        return `이름: ${ this.name }\n나이: ${ this.age }`;
    }
}

const myPet = new Pet('땅콩', 3);

console.log(myPet.toString()); // 이름과 나이 등이 문자열로 출력된다.