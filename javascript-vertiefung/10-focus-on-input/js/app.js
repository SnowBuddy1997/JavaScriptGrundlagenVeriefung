(() => {

    const input = document.getElementById('scanner-input');

    document.addEventListener('keypress', event => {


        console.log(event);
        console.log('Taste wurde gedrückt');

        // input.focus();
        input.value += event.key;
    });
})();