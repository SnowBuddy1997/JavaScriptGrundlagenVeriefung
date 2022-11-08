(() => {

    // Event Delegation
    // Idee: Event nicht dort behandeln, wo es auftritt, sondern "weiter draußen"

    let selectedElement;

    function highlight(element, defaultColor) {
        // Highlight vom alten Element entfernen

        if (selectedElement) {
            const oldColor = selectedElement.dataset.color ?? defaultColor;
            selectedElement.classList.remove(`highlighted-${oldColor}`);
        }

        selectedElement = element;
        const newColor = element.dataset.color ?? defaultColor;
        element.classList.add(`highlighted-${newColor}`);
    }


    document.addEventListener('click', event => {

        console.log('Irgendwo im Dokument wurde geklickt');
        const target = event.target;
        console.log(event.target);

        // Wir wollen nur auf Klicks von TDs reagieren
        if (target.tagName !== 'TD') {
            return;
        }

        console.log('Element war ein TD...');

        // Feld hervorheben
        highlight(target, 'yellow');

    });

})();