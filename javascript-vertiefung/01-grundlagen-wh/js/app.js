// Scopes - Gültigkeitsbereiche

// Globalen Scope
var globalVar = "Ich bin eine globale Variable";

// Ebenfalls eine globale Variable
window.anotherGlobalVar = "Auch global";


// Function Scope
function myFunction() {

    var funcVar = "Function Scoped";
    console.log(funcVar);
    console.log(globalVar);
}

// Aufruf einer Funktion
myFunction();
// Fehler
// console.log(funcVar);


// Neu-artiger Scope : Block Scope
let myBlockVar = "noch immer global";

for (let i = 0; i < 10; i++) {
    let j = 3;
    console.log(i);
}

// Fehler, da Block zu Ende
// console.log(i);
// console.log(j);

for (var k = 0; k < 10; k++) {
    console.log(k);
}

console.log(k);

const myConst = 42;
// Fehler, Konstante kann nicht verändert werden
// myConst = 21;


// Funktionen
// Deklaration
function myFunc() {
    console.log('myFunc aufgerufen');
}

myFunc();

// Parameter
function add(a, b) {
    console.log(a);
    console.log(b);
    console.log(a + b);
}

add(1, 3);

// "Überschüssige" Parameter werden einfach ignoriert
add(1, 3, 5);

add(1);

// Beliebige Anzahl an Parametern (variadische Funktion)
function addVar(string, ...numbers) {
    console.log(string);
    console.log(numbers);
}

addVar(1, 2, 3, 4, 5, 6, 7, 8, 9);

// Rückgabe-Werte
function subtract(a, b) {
    return a - b;
    console.log("Wird nicht mehr ausgeführt");
}

const result = subtract(4, 2);
console.log(result);

// Anonyme Funktionen
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function double(num) {
    return num * 2;
}

// Hier wird eine Referenz auf die Funktion "double" übergeben
const mapped = numbers.map(double);
console.log(mapped);

const mapped2 = numbers.map(function (num) {
    return num * 2;
});

console.log(mapped2);

// Anonyme Funktionen können in Variablen gespeichert werden
const multiply = function (a, b) {
    return a * b;
};

const multResult = multiply(2, 4);
console.log(multResult);


// Arrow-Syntax
const multiply2 = function (a, b) {
    return a * b;
};

// Schritt 1: function durch => ersetzen
// const multiplyArrow = (a, b) =>  {
//     return a * b;
// };

// Schritt 2: Anweisungs-Block und return weglassen
// (bei nur einer Anweisung im Body)
const multiplyArrow = (a, b) => a * b;

// Schritt 3: Parameter-Klammer weglassen (bei genau einem Parameter)
const doubleArrow = a => a * 2;

const resultArrow = numbers.map(num => num * 2);
console.log(resultArrow);

// Übung:
// Array numbers soll durch true/false ersetzt werden
// gerade Zahl -> true
// ungerade -> false

numbers.map(num => num % 2 === 0);


// Exkurs == vs ===
// Bei === findet davor kein implizites Casting statt
// Dh hier muss auch der Datentyp 'gleich' sein
console.log(2 == '2');
console.log(2 === '2');

// Referenz
// deep vs shallow copy

const myArray = [1, 2, 3, 4];
myArray[4] = 99;
console.log(myArray);

// Shallow ("Flache") Copy
// Hier wird nur die Referenz kopiert
// Beide Variablen zeigen auf denselben Speicherbereich
const myShallowArray = myArray;

myArray[0] = 100;

console.log(myArray);
console.log(myShallowArray);

// Deep copy
// Kopiert den Inhalt in einen neuen Speicherbereich
// Damit zwei unabhängige Versionen der Daten

const myDeepArray = [];
// for (let i = 0; i < myArray.length; i++) {
//     myDeepArray.push(myArray[i]);
// }

for (let element of myArray) {
    myDeepArray.push(element);
}

// Spread-Operator
/// [...myArray] -> [100,2,3,99]
const myDeepArray2 = [...myArray];

myArray[1] = 101;

console.log(myArray);
console.log(myDeepArray);
console.log(myDeepArray2);

// Spread-Operator funktioniert auch bei Objekten
const max = {
    name: 'Max',
    age: 17
};

const shallowMax = max;
const deepMax = {...max};

max.age = 18;

console.log(max);
console.log(shallowMax);
console.log(deepMax);


// Achtung, spread-Operator kopiert nur die erste "Ebene"
// Porperties, die keine primitiven Datentypen sind, werden weiterhin als
// shallow Copy angelegt!
const maxAndPet = {
    name: 'Max',
    age: 17,
    pet: {
        name: 'Felix',
        age: 4,
    }
}

const deepMaxAndPet = {...maxAndPet};
const deepPet = {...maxAndPet.pet};

const deeperMaxAndPet = {...maxAndPet, pet: deepPet}

maxAndPet.pet.age = 7;

console.log(maxAndPet);
console.log(deepMaxAndPet);
console.log(deeperMaxAndPet);

const olderMax = {...max, age: 42};

// Closures
function makeCounter(start) {
    let counterStart = start;

    return function () {
        console.log(counterStart++);
    };
}

const counter1 = makeCounter(1);
counter1();
counter1();
counter1();

const counter10 = makeCounter(10);
counter10();
counter10();
counter10();

// Module-Pattern
// Idee: Trennung von interner und externer API (Funktionen und Variablen)

// Taschenrechner

function buildCalculator(start) {

    function logger() {
        console.log(start);
    }

    function add(a) {
        start += a;
        logger();
        return start;
    }

    function subtract(a) {
        start -= a;
        logger();
        return start;
    }

    function multiply(a) {
        start *= a;
        logger();
        return start;
    }

    function divide(a) {
        if (a === 0) {
            throw new Error("Division durch 0 nicht erlaubt");
        }
        start /= a;
        logger();
        return start;
    }


    return {
        add: add,
        sub: subtract,
        mult: multiply,
        div: divide
    }
}

const myCalc = buildCalculator(100);
myCalc.add(10);
myCalc.sub(30);
myCalc.mult(3);

// Übung
// Taschenrechner um multiply und divide erweitern
myCalc.div(10);

try {
    myCalc.div(0);
} catch (error) {
    console.log('Fehler bei der Division');
    // throw new Error('Teil2 der Fehlerbehandlung...');
}


// Error-Handling

function fail() {
    throw new Error('Ein Fehler ist passiert');
}

// Absturz
// fail();

try {
    fail();
} catch (error) {
    console.log('Ein Fehler ist aufgetreten');
    console.log(error)
}

function a() {
    console.log('Function a called');
    try {
        b();
    } catch (error) {
        console.log('Fehler in a() behandelt');
        throw error;
    }
}

function b() {
    console.log('Function b called');
    try {
        c();
    } catch (error) {
        console.log('Fehler in b() behandelt');
        throw error;
    }
}

function c() {
    console.log('Function c called');
    try {
        d();
    } catch (error) {
        console.log('Fehler in c() behandelt');
        throw error;
    }

}

function d() {
    console.log('Function d called');
    throw new Error('Fehler in d()');
}

try {
    a();
} catch (error) {
    console.log('Fehler im Hauptprogramm behandelt');
}

