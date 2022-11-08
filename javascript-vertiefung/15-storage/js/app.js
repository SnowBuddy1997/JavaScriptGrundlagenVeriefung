(() => {

    // LocalStorage verfügbar?
    // if ('localStorage' in window) {
    //
    //     const nameInput = document.getElementById('name');
    //     const saveButton = document.getElementById('save');
    //     const loadButton = document.getElementById('load');
    //     const deleteButton = document.getElementById('delete');
    //
    //     saveButton.addEventListener('click', () => {
    //         localStorage.setItem('name', nameInput.value);
    //     });
    //
    //     loadButton.addEventListener('click', () => {
    //         nameInput.value ??= localStorage.getItem('name');
    //     });
    // }

    // LocalStorage verfügbar?
    if ('sessionStorage' in window) {

        const nameInput = document.getElementById('name');
        const saveButton = document.getElementById('save');
        const loadButton = document.getElementById('load');
        const deleteButton = document.getElementById('delete');

        saveButton.addEventListener('click', () => {
            sessionStorage.setItem('name', nameInput.value);
        });

        loadButton.addEventListener('click', () => {
            nameInput.value ??= sessionStorage.getItem('name');
        });

        deleteButton.addEventListener('click', () => {
            sessionStorage.removeItem('name');
        });
    }


})();