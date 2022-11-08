(() => {

    // Referenz auf die divs
    const grandParent = document.getElementById('grand-parent');
    const parent = document.getElementById('parent');
    const child = document.getElementById('child');

    // Wir wollen auf Click-Event reagieren

    // grandParent.onclick = () => {
    //     console.log('Grand-Parent wurde geklickt');
    // };

    // CAPTURING
    grandParent.addEventListener('click', event => {
        console.log('Grand-Parent wurde geklickt - Capturing');
        console.log(event);
    }, {capture: true});

    parent.addEventListener('click', event => {
        console.log('Parent wurde geklickt - Capturing');
        console.log(event);
    }, {capture: true});

    child.addEventListener('click', event => {
        console.log('Child wurde geklickt - Capturing');
        console.log(event);
    }, {capture: true});

    // BUBBLING
    grandParent.addEventListener('click', event => {
        console.log('Grand-Parent wurde geklickt - Bubbling');
        console.log(event);
    });

    parent.addEventListener('click', event => {
        console.log('Parent wurde geklickt - Bubbling');
        console.log(event);
    });

    child.addEventListener('click', event => {
        console.log('Child wurde geklickt - Bubbling');
        console.log(event);

        // Verhindert Bubbling, alle Handler auf diesem Element werden aber ausgeführt
        // event.stopPropagation();

        // Verhindert ebenfalls Bubbling, es werden aber keine folgenden Handler dieses Elements mehr ausgeführt
        // event.stopImmediatePropagation()
    });

    const clickHandler = event => {
        console.log('Child wurde geklickt 2 - Bubbling');
    };

    child.addEventListener('click', clickHandler);

    child.addEventListener('click', event => {
        console.log('Child wurde geklickt 3 - Bubbling');
        console.log('Ich entferne mich nach dem ersten Event selbst');
    }, {once: true});

    // EventListener wieder entfernen
    setTimeout(() => {
        console.log('Entferne EventListener...');
        child.removeEventListener('click', clickHandler);
    }, 5000);

})();