(async () => {

    let runs = [];
    let Toast;

    // Klasse zum Halten der Laufdaten
    class Run {
        start;
        end;
        distance;

        constructor(start, end, distance) {
            this.start = start;
            this.end = end;
            this.distance = distance;
        }
    }

    function setupSwal() {
        Toast = Swal.mixin({
            toast: true,
            position: 'bottom',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
        });
    }

    function showToast(message, type) {
        Toast.fire({
            text: message,
            icon: type
        });
    }

    // Laufdaten vom Server laden
    async function loadRuns() {
        const url = 'http://localhost:3000/runs';

        let response;

        // Übung: Caching implentieren
        // - Cache öffnen (my-runs) caches.open
        // - testen, ob der Request im Cache vorhanden ist cache.match()
        // - wenn ja, gecachte Response ausliefern
        // - wenn nein, Request ausführen und cachen (cache.add(url) )


        try {
            if ('caches' in window) {

                const cache = await caches.open('runs-cache');
                const cachedResponse = await cache.match('http://localhost:3000/runs');

                if (cachedResponse === undefined) {
                    // nicht im Cache - von Seite laden
                    await cache.add('http://localhost:3000/runs');
                    response = await cache.match('http://localhost:3000/runs');
                } else {
                    // im Cache
                    response = cachedResponse;
                }

            } else {
                response = await fetch(url);
            }
        } catch (error) {
            // Idee: response mit Dummy-Daten
            const dummy = [
                {
                    id: 1,
                    start: '2022-11-03 16:15',
                    end: '2022-11-03 17:15',
                    distance: 8.4
                }
            ];

            response = new Response(JSON.stringify(dummy));
        }
        runs = await response.json();
    }

    /**
     * Erzeugt aus den übergebenen Läufen eine HTML-Tabelle
     *
     * @param runs
     */
    function populateTable(runs) {

        // HTML erzeugen und an die richtige Stelle im DOM schreiben

        // 1 - Stelle im DOM finden
        const tableBody = document.querySelector('#my-runs-table > tbody')

        // 2 - HTML erzeugen (ein langer String)
        let htmlString = '';

        runs.forEach((run, index) => {

            // Pro Lauf soll eine Zeile in der Tabelle erzeugt werden
            // <tr>
            //     <td>2022-11-03 16:15</td>
            //     <td>2022-11-03 17:15</td>
            //     <td>8.6</td>
            //     <td>Aktion...</td>
            // </tr>

            htmlString += '<tr>';
            htmlString += `<td>${run.start}</td>`;
            htmlString += `<td>${run.end}</td>`;
            htmlString += `<td class="text-center">${run.distance}</td>`;
            htmlString += `<td>
                            <button type="button" class="btn btn-link" data-run-id="${run.id}" data-run-index="${index}">
                                <i class="bi bi-dash-circle text-danger"></i>
                            </button>
                            </td>`;
            htmlString += '</tr>';
        });

        tableBody.innerHTML = htmlString;
    }

    // Chart mit Daten füllen
    // - Labels: Startzeiten Tag-Monat-Jahr
    // - Daten: Distanz
    // - Chart aktualisieren
    function populateChart(chart, data) {

        const labels = data.map(run => run.start);
        const distances = data.map(run => run.distance);

        // Daten dem Chart zur Verfügung stellen
        chart.data.labels = labels;
        chart.data.datasets[0].data = distances;
        chart.update();
    }

    async function deleteRun(id) {
        const response = await fetch(`http://localhost:3000/runs/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            console.log(`Lauf mit der ID ${id} wurde erfolgreich gelöscht`);
            showToast('Lauf erfolgreich gelöscht', 'success');
        }

        const cache = await caches.open('runs-cache');
        await cache.delete('http://localhost:3000/runs');
    }

    // EventListener für Formular
    const button = document.getElementById('add-run-btn');
    button.addEventListener('click', async event => {

        // Wir verhindern, dass der Standard-Handler ausgeführt wird (Form abschicken & Neuladen)
        event.preventDefault();

        // === Validierung ===
        // Referenz auf das Formular
        const form = document.getElementById('add-run-form');
        // BootStrap- bzw. Browser-Validierung auslösen
        const isValid = form.checkValidity();
        // Form als validiert markieren (Klasse aufbinden)
        form.classList.add('was-validated');

        if (!isValid) {
            // Abbruch, wenn Validierung nicht erfolgreich
            return;
        }

        // Inputs auslesen
        const startInput = document.getElementById('input-start');
        const endInput = document.getElementById('input-end');
        const distanceInput = document.getElementById('input-distance');

        // Eingaben auslesen
        const newRun = new Run(
            startInput.value,
            endInput.value,
            distanceInput.value
        );

        // Daten an den Server schicken
        let response;
        try {
            response = await fetch('http://localhost:3000/runs', {
                method: 'POST',
                body: JSON.stringify(newRun),
                headers: {
                    'Content-Type': 'application/json' // MIME-Type
                }
            });
        } catch (error) {
            console.log(error);
            // TODO: Eventuell SweetAlert Meldung anzeigen
        }

        // Der Server liefert den erstellten Lauf inklusive vom Server erstellter id zurück
        const createdRun = await response.json();

        // Eingabefelder zurücksetzen
        startInput.value = '';
        endInput.value = '';
        distanceInput.value = '';

        // runs-Array aktualisieren
        runs.push(createdRun);

        // Tabelle aktualisieren
        populateTable(runs);

        // Chart aktualisieren
        populateChart(chart, runs);

        // Cache invalidieren
        const cache = await caches.open('runs-cache');
        await cache.delete('http://localhost:3000/runs');

        // Validierungs-Meldung wieder entfernen
        form.classList.remove('was-validated');
        showToast('Lauf erfolgreich erstellt', 'success');
    });

    // EventListener für die Tabelle
    const table = document.getElementById('my-runs-table');
    table.addEventListener('click', async event => {

        const target = event.target;
        console.log(target);

        // Wir sind nur an Klick auf das Icon im Button interessiert
        if (target.tagName !== 'I') {
            return;
        }

        // "Problem": Data-Attribute befindet sich am Button...
        // Idee: Button ist das Parent-Element von Icon
        const button = target.parentElement;

        // Löschen:
        // - Am Server löschen
        //  o ID des Laufs (Data-Attribute)
        //  o Request an den Server schicken (DELETE)
        // - Aus dem lokalen runs-Array löschen
        //  o Data-Attribute index enthält den Index des Laufs
        //  o Lauf aus dem Array löschen (splice)
        //  o Tabelle aktualisieren
        //  o Chart aktualisieren

        // -> Übung
        const id = button.dataset.runId;
        const index = +button.dataset.runIndex;
        console.log(index)

        // Vom Server löschen
        await deleteRun(id);

        // Lokal löschen
        runs.splice(index, 1);

        // Tabelle und Chart aktualisieren
        populateTable(runs);
        populateChart(chart, runs);
    });


    // Chart braucht Canvas und Config
    const canvas = document.getElementById('my-runs-stats');
    const config = {
        type: 'bar',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Distanz',
                    data: [],
                    backgroundColor: 'rgb(255,99,132)'
                }
            ]
        }

    };
    const chart = new Chart(canvas, config);
    console.log(chart);

    setupSwal();

    await loadRuns();
    populateTable(runs);
    populateChart(chart, runs);
    // Tabelle mit Daten füllen

})();