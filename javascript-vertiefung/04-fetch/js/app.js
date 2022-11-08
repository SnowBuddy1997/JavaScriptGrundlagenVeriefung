// IIFE (Immediately invoked functional expression)
// Ziel: globalen Scope nicht "vollzumüllen"
(function () {

    fetch('https://reqres.in/api/users')
        // fetch liefert ein Promise
        .then(response => {
            console.log(response);
            // Payload/Body auspacken
            return response.json()
        })
        .then(json => {
            console.log(json);
            return json.data;
        })
        .then(data => console.log(data))
        .catch(() => console.log('Fehler beim Aufruf der URL'));
})();

// Übung

const request1 = fetch('https://reqres.in/api/users?delay=3');
const request2 = fetch('https://reqres.in/api/users?delay=5');
const request3 = fetch('https://gibts.net/');

const requests = [
    request1,
    request2,
    request3,
];

// Übung:
// - Promise.all(requests)
// - Promise.any(requests)
// - Promise.race(requests)

// then() bzw. catch() machen
// Beobachtungen?

// Promise.all(requests)
//     .then(responses => console.log(responses))
//     .catch(error => console.log(error));

// Promise.any(requests)
//     .then(responses => console.log(responses))
//     .catch(error => console.log(error));

Promise.race(requests)
    .then(responses => console.log(responses))
    .catch(error => console.log(error));