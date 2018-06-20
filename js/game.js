function game(setBombs = 10, fields = 100) {
    let bombs = 0;
    const subheader = document.getElementById('subheader');

    subheader.innerHTML = `${fields} left to clear`;

    /* Проверка на бомбу */
    const searchBomb = id => document.getElementById(id) ?
        ((document.getElementById(id)).hasAttribute('bomb') !== false ? 1 : 0) : 0;

    /* Создание поля */
    for (let i = 0; i < fields; i++) {
        const field = document.createElement('div');

        field.className = 'close';
        field.id = `${Math.floor(i / 10)}_${i % 10}`;
        document.getElementById('game').appendChild(field);
    }

    /* Расставляем мины */
    function plantBombs() {
        const collection = document.getElementsByClassName('close');

        for (let i = 0; setBombs > bombs; i++) {
            if (Math.random() < 0.05 && setBombs !== bombs && !collection[i].hasAttribute('bomb')) {
                collection[i].setAttribute('bomb', 'bomb');
                document.getElementById('header').innerHTML = (++bombs) + ' bombs';
            }

            if (i === collection.length - 1 && setBombs > bombs) i = 0;
        }
    }

    plantBombs();

    /*  */
    for (let i = 0; i < fields; i++) {
        const y = Math.floor(i / 10); //ось y
        const x = i % 10;             //ось x
        const collectionFields = document.getElementById(y + '_' + x);
        let numberOfNearestBombs = 0;

        for (let i = 0; i < 9; i++) {
            numberOfNearestBombs += searchBomb(`${(y - (Math.floor(i / 3) - 1))}_${(x - (i % 3 - 1))}`);
        }

        collectionFields.innerHTML = numberOfNearestBombs === 0 ? ' ' : numberOfNearestBombs;

        collectionFields.onclick = function () {
            let mix = this.id.split('_');
            openField(mix[0], mix[1]);
        };

        collectionFields.oncontextmenu = function () {
            this.className = this.className.indexOf('flag') !== -1 ?
                this.className.replace(/ flag/, '') : this.className + ' flag';

            return false;
        }
    }

    /* Открытие поля*/
    function openField(y, x) {
        const selectedField = document.getElementById(y + '_' + x);

        if (!selectedField || selectedField.className.indexOf('close') === -1) return;

        if (selectedField.hasAttribute('bomb') === false) {
            const elements = table.getElementsByTagName('div');
            let remainingCloseFields = 0;
            selectedField.className = 'open';

            //Открытие соседних ячеек если пустые
            for (let elem of elements) {
                if (elem.className && elem.className.indexOf('close') !== -1) remainingCloseFields++;
            }

            subheader.innerHTML = `${remainingCloseFields} left to clear`;

            if (remainingCloseFields <= bombs) alert('You win!');
        } else {
            const collection = document.getElementsByTagName('div');

            for (let i = 0; i < collection.length; i++) {
                collection[i].className = collection[i].hasAttribute('bomb') !== false ? 'bomb' : 'open';
            }

            question('You lose!');
        }

        if (selectedField.innerHTML === ' ') {
            for (let i = 0; i < 9; i++) {
                openField(y - ((Math.floor(i / 3) - 1)), x - (((i % 3) - 1)));
            }
        }
    }
}

function question(value) {
    alert(value);
    window.location.reload();
    const answer = confirm('Next game ?');
    if (!answer) alert('Why No? Lets play!');
    else window.location.reload();
}