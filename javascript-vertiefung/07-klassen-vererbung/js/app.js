(() => {

    class Pet {
        name;

        constructor(name) {
            this.name = name;
        }
    }

    // Vererbung
    // Die Klasse Dog erweitert die (leitet von der) Klasse Pet
    class Dog extends Pet {
        // Hunde haben zusätzlich eine Farbe
        color;

        static label = 'DOG';

        constructor(name, color) {
            // Wir bauen unser Objekt von innen nach außen (Pet, dann Dog)
            super(name);
            this.color = color;
        }

        bark() {
            console.log('Wuff, wuff');
        }

        static getDescription() {
            console.log(this.label, 'Hunde sind der beste Freund des Menschen');
        }
    }

    const charly = new Dog('Charly', 'braun');
    console.log(charly);

    // Fehler, statische Methode sind auf der Klasse, nicht auf der Instanz (charly) zu finden
    // charly.getDescription();

    Dog.getDescription();


    class Vehicle {

        #color;

        constructor(color) {
            this.#color = color;
        }

        drive() {
            console.log('Das Fahrzeug bewegt sich...');
        }

        getDescription() {
            console.log(`Die Farbe des Fahrzeugs ist ${this.#color}`);
        }

        getColor() {
            return this.#color;
        }
    }

    class Car extends Vehicle {
        #tires;

        constructor(color, tires) {
            super(color);
            this.#tires = tires;
        }

        refuell() {
            console.log('Das Auto wird aufgetankt...');
        }

        getTires() {
            console.log(`Das Auto hat ${this.#tires} Reifen`);
        }

        // Überschreiben der vorhandenen Methode getDescription()
        getDescription() {
            console.log(`Das AUTO hat die Farbe ${this.getColor()}`);
        }

    }

    const myCar = new Car('white', 'Toyota');
    myCar.drive();
    myCar.refuell();
    myCar.getTires();
    myCar.getDescription();


    // Übung:
    // Geometrische Formen: Rechteck, Kreis, ...
    // Basis-Klasse Shape erstellen
    // Shape hat Property #color
    // Methoden:
    // - getColor() - gibt die Farbe zurück
    // - getArea() - Gibt die Fläche zurück: Basisklasse liefert 'Nicht implementiert' bzw. undefined
    // - getCircumference() - Gibt den Umfang zurück: Basisklasse liefert 'Nicht implementiert' bzw. undefined

    // Die zwei Klassen Rectangle und Circle erweitern die Klasse Shape
    // Rectangle:
    // - #width
    // - #length

    // Circle:
    // - #radius
    // Umfang: 2 * radius * Math.PI
    // Fläche: radius * radius * Math.PI (alternativ radius **2 * Math.PI)

    // Beide Klassen sollen die Methoden getArea() und getCircumference() überschreiben und konkrete Werte liefern


    class Shape {
        #color;

        constructor(color) {
            // if (this.constructor === Shape) {
            //     throw new Error('Klasse kann nicht instaziiert werden');
            // }
            this.#color = color;
        }

        getColor() {
            return this.#color;
        }

        getArea() {
            // throw new Error('Nicht implementiert');
            console.warn('Funktion nicht definiert');
            return undefined;
        }

        getCircumference() {
            // throw new Error('Nicht implementiert');
            console.warn('Funktion nicht definiert');
            return undefined;
        }

        getDescription() {
            return `Umfang ${this.getCircumference()}, Fläche ${this.getArea()}`;
        }
    }

    class Rectangle extends Shape {
        #length;
        #width;

        constructor(color, length, width) {
            super(color);
            this.#length = length;
            this.#width = width;
        }

        getArea() {
            const area = this.#length * this.#width;
            console.log(`Die Fläche des Rechtecks (${this.#length}x${this.#width}) ist: ${area}`);
            return area;
        }

        getCircumference() {
            const circum = 2 * (this.#length + this.#width);
            console.log(`Der Umfang des Rechtecks (${this.#length}x${this.#width}) ist: ${circum}`);
            return circum;
        }

    }

    const rect1 = new Rectangle('blau', 4, 6);
    // const area1 = rect1.getArea()
    // const circ1 = rect1.getCircumference();
    console.log(rect1.getDescription());

    class Circle extends Shape {
        #radius;

        constructor(color, radius) {
            super(color);
            this.#radius = radius;
        }

        getArea() {
            const area = this.#radius ** 2 * Math.PI;
            console.log(`Die Fläche des Kreises (r=${this.#radius}) ist: ${area}`);
            return area;
        }

        getCircumference() {
            const circ = 2 * this.#radius * Math.PI;
            console.log(`Der Umfang des Kreises (r=${this.#radius}) ist: ${circ}`);
            return circ;
        }
    }

    const circle1 = new Circle('grün', 3);
    // circle1.getArea();
    // circle1.getCircumference();
    console.log(circle1.getDescription());

    // Einwurf:
    // Currying
    function makeCounter(initial) {
        return function () {
            initial++;
            console.log(`Counter: ${initial}`);
        };
    }

    const myCounter = makeCounter(0);

    makeCounter(0)();


})();