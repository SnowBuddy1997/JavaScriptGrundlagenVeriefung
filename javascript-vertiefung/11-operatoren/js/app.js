(() => {

    const max = {
        name: 'Max',
        age: 16,
        pet: {
            name: 'Felix'
        }
    };

    const moritz = {
        name: 'Moritz',
        pet: {
            name: 'Felix',
            age: 12
        },
        hobbies: ['sport', 'lesen']
    };

    const lisa = {
        name: 'Lisa',
        age: 32
    };

    const persons = [
        max,
        moritz,
        lisa
    ];

    // console.log(person.pet.age.toString());

    persons.forEach(person => {
        console.log(person.name);
        console.log(person.age.toString());
        console.log(person.hobbies?.[0] ?? 'Keine Hobbies');

        console.log(person.pet.age?.());

        console.log(person?.pet?.age?.toString() ?? 'Haustier hat kein Alter');

        // if (person.pet && person.pet.age) {
        //     console.log(person.pet.age.toString());
        // }

    });

    if (max.pet.age) {
        console.log(max.pet.age.toString());
    } else {
        console.log("Kein Alter gefunden...");
    }


})();