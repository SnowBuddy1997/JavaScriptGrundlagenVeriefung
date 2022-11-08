(() => {

    const message = document.getElementById('message');

    function calculate() {
        console.log('Starte Berechnung in app.js ...');
        let sum = 0;
        for (let i = 0; i < 10000000000; i++) {
            sum += i;
        }
        console.log(`Summe berechnet: ${sum}`);
    }

    function startWorker() {

        // Neuen Worker erstellen
        const worker = new Worker('js/worker.js');

        // Setup für den Worker
        worker.onmessage = event => {
            console.log('Event von Worker');
            console.log(event);
            const data = event.data;
            message.innerText = `Fortschritt: ${event.data.progress * 100}%`;

            if (data.progress === 1) {
                message.innerText = `Ergebnis von Worker: ${event.data.result}`;
            }
        };

        message.innerText = 'Worker gestartet...'
        worker.postMessage(10000000000);
        console.log('Nachricht an Worker gesendet...');
    }

    function changeBackground() {
        document.body.style.backgroundColor = 'rgba(0,255,0, 0.5)';
    }

    function startFibonacciWorker() {

        const worker = new Worker('js/fibonacci.js');
        worker.onmessage = event => {
            console.log(`[APP] Fibonacci: ${event.data.result} (Iterationen: ${event.data.iteration})`);
        };
        worker.postMessage(100000);
        console.log('Fibonacci-Worker gestartet');
    }

    const buttonCalc = document.getElementById('calculation');
    buttonCalc.addEventListener('click', calculate);

    const buttonWorker = document.getElementById('webworker');
    buttonWorker.addEventListener('click', startWorker);

    const buttonBackground = document.getElementById('background');
    buttonBackground.addEventListener('click', changeBackground);

    const buttonFibonacci = document.getElementById('fibonacci');
    buttonFibonacci.addEventListener('click', startFibonacciWorker);

    // Übung:
    // Worker, der die x-te Fibonacci-Zahl berechnet
    // x kommt als Input von app.js
    // -> fibonacci.js


})();