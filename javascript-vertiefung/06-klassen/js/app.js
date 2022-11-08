(function () {

    function PersonF(name, age) {
        this.name = name;
        this.age = age;

        this.sayHi = () => {
            console.log(`Hi, mein Name ist ${this.name}`);
        };
    }

    const max = new PersonF('Max', 42);
    console.log(max);
    max.sayHi();


    // Klassensyntax seit ES6

    class Person {
        // Private - Raute als erstes Zeichen im Namen
        #secret;

        constructor(name, age) {
            this.name = name;
            this.age = age;

            // Private
            this.#secret = 'Belongs to me...';
        }

        sayHi() {
            console.log(`Hi, mein Name ist ${this.name}`);
        }

        tellSecret() {
            console.log(`Psst, mein Geheimnis ist: ${this.#secret}`);
        }

    }

    const moritz = new Person('Moritz', 45);
    console.log(moritz);
    moritz.sayHi();
    moritz.tellSecret();


    var myObject = {
        // Property mit Funktion als Datentyp
        age: 42,
        sayHi: () => {
            console.log('Hi, ich bin ein einfaches Objekt');
        },
    };

    console.log(myObject);

    myObject.sayHi();
    // Objekten können zusätzlich Properties zugewiesen werden
    myObject.sayBye = () => {
        console.log('Bye...');
    };

    myObject.sayBye();

    // Referenz auf die originale log()-Funktion
    const myLogBackup = console.log;

    console.log('Das ist mein Text');
    // log() überschreiben
    console.log = () => {
        // Nichts...
    };

    // Keine Ausgabe mehr
    console.log('Das ist mein Text');
    // Originales log() wiederherstellen
    console.log = myLogBackup;
    console.log('Das ist mein Text');

    // Mix-ins für Objekte
    // "Normales" JavaScript Objekt
    // Idee: "Vorlage" für Methoden bzw. Eigenschaften, die Objekten zugewiesen werden können

    const studentMixin = {
        grade: 4,
        study: function () {
            console.log('Lernen, lernen, lernen');
            if (this.grade > 1) {
                this.grade--;
            }
        },
        getGrade() {
            console.log(`Meine Note ist ${this.grade}`);
        },
    };

    // Wie wird ein Mixin zugewiesen?
    const studentObject = Object.assign({}, studentMixin);
    console.log(studentObject);
    studentObject.study()

    // Moritz wird zum Studenten
    Object.assign(moritz, studentMixin);
    moritz.study();


    // Besser: Mixin direkt in einem Konstruktor zuweisen
    class Adult {
        firstname;
        lastname;

        constructor(firstname, lastname) {
            this.firstname = firstname;
            this.lastname = lastname;

            // Innerhalb des Konstruktors
            // Object.assign(this, studentMixin);
        }
    }

    const mrSmith = new Adult('John', 'Smith');

    // Idee: Mixin direkt im Prototypen zuweisen
    Object.assign(Adult.prototype, studentMixin);

    console.log(mrSmith);

    mrSmith.getGrade();
    mrSmith.study();
    mrSmith.study();
    mrSmith.study();
    mrSmith.getGrade();

    // Eigenschaften können mit 'delete' gelöscht werden
    delete mrSmith.lastname;
    console.log(mrSmith);
})();


