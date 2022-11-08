(async () => {

    let intervalId;

    function cleanupCache(cache, interval) {
        intervalId = setInterval(async () => {
            await cache.delete('http://localhost:3000/runs');
            console.log('Cache wurde geleert');
        }, interval);
    }

    // clearInterval(intervalId);
    
    // Feature-Detection ("Kann der Browser das?")
    if ('caches' in window) {
        // Ja, wird unterstützt

        // Cache öffnen und/oder erstellen
        const myCache = await caches.open('my-cache');
        console.log(myCache);

        // Cache regelmäßig leeren
        cleanupCache(myCache, 10000);

        // Hat der Cache einen Eintrag für http://localhost:3000/runs?
        const cacheResponse = await caches.match('http://localhost:3000/runs');

        // Alternativ: Matching auf ein Request-Objekt statt der URL
        // const request = new Request('http://localhost:3000/runs');
        // const cacheResponse = await caches.match(request);

        if (cacheResponse === undefined) {
            // Kein Treffer
            console.log('Lade Daten vom Server...');

            const url = 'http://localhost:3000/runs';
            // Add macht ein fetch und fügt die Antwort dem Cache hinzu
            await myCache.add(url);
            const response = await myCache.match(url);
            console.log(response);
        } else {
            console.log('Antwort im Cache gefunden');
            console.log(cacheResponse);
        }

    } else {
        console.log('Caching API wird von diesem Browser nicht unterstützt...');
    }


})();