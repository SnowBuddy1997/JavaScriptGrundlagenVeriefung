/*
// Simuliert einen HTTP-Request
function request(url, callback) {
    // Zeitverzögerung einbauen
    setTimeout(function () {
        console.log(`Antwort von ${url} erhalten`);
        // Wie kann ich an dieser Stelle beliebigen Code ausführen?
        // Über den Parameter Callback kann eine Referenz auf eine Funktion
        // übergeben werden, die wir hier ausführen

        const response = {
            content: 'Hallo Callback',
        }

        callback(response);
    }, 2000);
}


request('http://google.com', (data) => console.log(`Callback aufgerufen, Data:`, data));

console.log('Hier läuft das Programm, während der Request gerade unterwegs ist');

// CALLBACK-HELL
function request2(url, success, error) {
    // Zeitverzögerung einbauen
    setTimeout(function () {

        console.log(`Antwort von ${url} erhalten`);
        // Wie kann ich an dieser Stelle beliebigen Code ausführen?
        // Über den Parameter Callback kann eine Referenz auf eine Funktion
        // übergeben werden, die wir hier ausführen

        const response = {
            content: 'Hallo Callback',
        }

        const hasError = Math.random() > 0.1;
        if (hasError) {
            error();
        } else {
            success(response);
        }
    }, 2000);
}

request2('http://google.com',
    response => console.log(response),
    () => console.log('Ein Fehler ist aufgetreten')
);

// Die HÖLLE...
// request2('http://google.com',
//     response => console.log(response),
//     () => {
//         console.log('Ein Fehler ist aufgetreten');
//         request2('http://yahoo.com',
//             response => console.log(response),
//             () => {
//                 console.log('Noch ein Fehler ist aufgetreten');
//                 request2('https://gibts.net',
//                     response => console.log(response),
//                     () => console.log('Noch immer ein Fehler...')
//                 );
//             }
//         );
//     }
// );

// Promise selbst erstellen
const myPromise = new Promise((resolve, reject) => {

    // resolve() und reject() sind beides Funktionen

    // asynchrone Operation
    const hasError = Math.random() > 0.5;

    if (hasError) {
        // Wenn Operation fehlerhaft -> reject() aufrufen
        reject('Ein Fehler ist aufgetreten');
    } else {
        // Wenn Operation erfolgreich -> resolve() aufrufen
        resolve('Antwort erhalten');
    }

});

myPromise
    // Erfolgsfall
    .then(data => console.log(data))
    .catch(err => console.error(err))
    .finally(() => console.log('Finally wird immer aufgerufen'));

// Idee: request auf Promise umbauen

function requestPromise(url) {

    return new Promise((resolve) => {
        setTimeout(function () {
            console.log(`Antwort von ${url} erhalten`);
            const response = {
                content: 'Hallo Callback',
            }

            // Ergebnis wird vom Promise zurückgeliefert
            resolve(response);
        }, 2000);
    });

}

requestPromise('http://www.google.com')
    .then(response => console.log('Antwort erhalten:', response));

function request2Promise(url) {
    return new Promise((resolve, reject) => {

        setTimeout(function () {
            console.log(`Antwort von ${url} erhalten`);

            const response = {
                content: 'Hallo Callback',
            }

            const hasError = Math.random() > 0.1;
            if (hasError) {
                reject(new Error(`Fehler beim Aufruf von ${url}`));
            } else {
                resolve(response);
            }
        }, 2000);
    });
}

request2Promise('http://www.google.com')
    .then(response => console.log(response))
    .catch(() => {
        console.log('Ein Fehler ist aufgetreten');
        return request2Promise('https://yahoo.com');
    })
    .then(response => console.log(response))
    .catch(() => {
        console.log('Ein Fehler ist aufgetreten');
        return request2Promise('https://gibts.net');
    })
    .then(response => console.log(response))
    .catch(() => console.log('Fehler gefangen'));

requestPromise('http://google.com')
    .then(response => {
        console.log(response);
        // Returnwert wird immer in ein Promise verpackt (daher Promise<number>)
        return 1;
    })
    .then(result => console.log(result));
*/

const anotherPromise = new Promise((resolve, reject) => {

    // Operation, die länger dauert...
    const person = {
        name: 'Franz',
        age: 54
    };
    setTimeout(() => resolve(person), 4000);

});

anotherPromise.then(result => console.log(new Date(), result));
// Funktioniert nicht
console.log(new Date(), anotherPromise);

// Übung:
// Eine Funktion calcSum soll nach 3 Sekunden (-> setTimeout()) den Wert 42 liefern
// Diese Funktion soll innerhalb des Executors eines Promise aufgerufen werden

// BONUS: setTimeout() verwendet Callback
// Ziel: Promise-basiertes setTimeout mit dem Namen delay()
// delay(3000).then()....

// Ein Promise verbindet einen *Produzenten* mit einem *Konsumenten*
const sumPromise = new Promise((resolve, reject) => {
    // Produzent (erzeugt den Wert 42)
    setTimeout(() => resolve(42), 3000);
});

// Konsument (konsumiert das Ergebnis = 42)
sumPromise.then(result => console.log(result));

function delay(millis) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), millis);
    });
}

delay(3000).then(
    () => console.log('Es sind 3 Sekunden vergangen')
);

// Promise-Klasse hat zwei statische Methoden resolve() und reject(),
// die direkt aufgerufen werden können

const sumStaticResolve = Promise.resolve(21);

sumStaticResolve.then(result => console.log(result));






