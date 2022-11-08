const promise1 = new Promise(resolve => {
    setTimeout(() => resolve('Promise 1 resolved'), 2000);
});

const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Promise 2 resolved'), 5000);
});

const promise3 = new Promise(resolve => {
    setTimeout(() => resolve('Promise 3 resolved'), 10000);
});

const allPromises = [
    promise1,
    promise2,
    promise3
];

// all - Wartet, bis alle Promises resolved sind und resolved dann selbst, oder rejected sobald
// eines der Promises rejected.

// Promise.all(allPromises)
//     .then(results => console.log(results))
//     .catch(error => console.log(error));

// Kombinieren von mehreren HTTP-Requests
// -> Übung

// any - Liefert das erste Promise das resolved oder rejected wenn alle Promises rejecten
// Promise.any(allPromises)
//     .then(result => console.log(result))
//     .catch(error => console.error(error));


// race - nimmt das erste Promise, das resolved oder rejected (das "Schnellste")
// Promise.race(allPromises)
//     .then(result => console.log(result))
//     .catch(error => console.log(error));

// Verketten
promise1
    .then(result => {
        console.log('Promise 1', result);
        return promise2;
    })
    .then(result => {
        console.log('Promise 2', result);
        return promise3;
    })
    .then(result => {
        console.log('Promise 3', result);
    })
    .catch(error => console.log(error));

// Übung Promise.all()
// Requests gebündelt ausführen und das Ergebnis auf der Console ausgeben

const requests = [
    fetch(`https://reqres.in/api/users?delay=2000`),
    fetch(`https://reqres.in/api/users?delay=3000`),
];

Promise.all(requests)
    .then(responses => console.log(responses));
