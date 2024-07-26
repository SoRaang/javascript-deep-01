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

    static #counter = 0;
    static get counter() {
        return StatSquare.#counter;
    }

    constructor(length) {
        this.length = length;
        StatSquare.#counter += 1;
    }

    static perimeterOf(length) {
        return length * 4;
    }

    static areaOf(length) {
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

console.log(`지금까지 생성된 StatSquare 인스턴스는 ${ StatSquare.counter }개 입니다.`);
console.log(`한 변의 길이가 20인 정사각형의 둘레는 ${ StatSquare.perimeterOf(20) }입니다.`);
console.log(`한 변의 길이가 30인 정사각형의 둘레는 ${ StatSquare.areaOf(30) }입니다.`);