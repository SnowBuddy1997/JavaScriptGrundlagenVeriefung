// Callbacks des Worker implementieren
// Worker -> self
self.onmessage = event => {

    console.log('[WORKER] Nachricht erhalten');
    console.log(event);

    const limit = event.data;

    // Berechnung
    console.log('[WORKER] Starte Berechnung');
    console.log(`[WORKER] Limit: ${limit}`);

    let sum = 0;
    for (let i = 0; i < limit; i++) {
        if (i === Math.floor(limit / 2)) {
            postMessage({
                progress: 0.5,
                result: undefined
            });
        }

        sum += i;
    }

    console.log(`[WORKER] Summe berechnet: ${sum}`);

    // Ergebnis zurückmelden
    postMessage({
        progress: 1,
        result: sum
    });
};