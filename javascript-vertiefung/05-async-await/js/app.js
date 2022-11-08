(async () => {

    // await wartet auf das resolve() des Promises auf der rechten Seite
    // Die Funktion, in der await verwendet wird, muss mit async markiert werden
    const response = await fetch('https://reqres.in/api/users');
    console.log(response);

    const json = await response.json();
    console.log(json);

    const data = json.data;
    console.log(data);


    function delay(millis) {
        return new Promise(resolve => {
            setTimeout(() => resolve(), millis);
        });
    }

// delay(3000).then(() => console.log('3 Sekunden sind vergangen...'));

    // await delay(3000);
    // // 3 Sekunden Pause
    // console.log('3 Sekunden sind vergangen...');

    // Wie wird mit einem reject umgegangen?
    // -> try-catch, wie bei normalen Fehlern
    const promise = new Promise((resolve, reject) => {
        reject('Promise rejected');
    });

    try {
        const rejected = await promise;
    } catch (error) {
        console.log('Fehler! ', error);
    }


    // Beispiel - fetch mit Error-Handling

    // Hier kann ein Fehler (reject) auftreten
    try {
        const response2 = await fetch('https://gibts.net');
    } catch (error) {
        console.log(error);
    }

    // async "wickelt" den Returnwert automatisch in ein Promise
    async function promiseLike() {
        return 42;
    }

    function promiseLike2() {
        return Promise.resolve(42);
    }

    promiseLike().then(val => console.log(val));

    // async/await und then() können jederzeit gewechselt werden
    const result = await promiseLike();
    console.log(result);

    promiseLike2().then(val => console.log(val));

    // Übung:
    // 3 Promises, die einfach eine Zahl resolven
    // Die Summe der Zahlen soll ausgegeben werden
    // - mit await
    // - mit Promise.all()

    const promiseNumber1 = new Promise(resolve => {
        setTimeout(() => resolve(13), 2000);
    });
    const promiseNumber2 = new Promise(resolve => {
        setTimeout(() => resolve(42), 1000);
    });
    const promiseNumber3 = new Promise(resolve => {
        setTimeout(() => resolve(8), 4000);
    });

    // Mit await
    let promiseResult = await promiseNumber1;
    promiseResult += await promiseNumber2;
    promiseResult += await promiseNumber3;

    console.log(`Gesamtsumme: ${promiseResult}`);

    // Promise.all()
    Promise.all([
        promiseNumber1,
        promiseNumber2,
        promiseNumber3,
    ])
        .then(results => results.reduce((sum, element) => element + sum, 0))
        .then(sum => console.log(`Gesamtsumme: ${sum}`));

    // Version 2
    const numbers = await Promise.all([
        promiseNumber1,
        promiseNumber2,
        promiseNumber3,
    ]);

    let awaitSum = 0;
    for (let number of numbers) {
        awaitSum += number;
    }
    console.log(`Gesamtsumme: ${awaitSum}`)

    // Übung:
    // 2 Requests:
    // - https://reqres.in/api/users?page=1
    // - https://reqres.in/api/users?page=2
    //
    // Mit Promise.all():
    //  - Daten holen
    //  - JSON extrahieren
    //  - data Property auspacken
    //  - 2 Arrays zu einem User-Array zuführen (concat)

    const urls = [
        'https://reqres.in/api/users?page=1',
        'https://reqres.in/api/users?page=2',
    ];

    const requests = urls.map(url => fetch(url));
    // const responses = Promise.all(requests);
    // responses
    //     .then(responses => responses.map(async response => await response.json()))
    //     .then(jsons => jsons.map(json => json.data))
    //     .then(data => console.log(data));

    const responses = await Promise.all(requests);
    console.log(responses);
    const jsons = await Promise.all(responses.map(response => response.json()));
    console.log(jsons);
    // Ab hier wieder synchron
    const users = jsons.map(json => json.data);
    console.log(users);
    const allUsers = Array.prototype.concat(...users);
    // const allUsers = users[0].concat(users[1]);
    console.log(allUsers);


    // const jsons = responses.map(async response => await response.json());
    // console.log(jsons);
    // const data2 = jsons.map(async json => await json.data);
    // console.log(data2);

})();


