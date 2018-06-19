function renderTable(quantityRow = 10, quantityCell = 10, width = 28, height = 28) {
    const test = document.querySelector('.createElementButton');

    if (test) {
        const table = document.querySelector('.game');
        table.remove();
        test.remove();
    }

    const tableDiv = document.querySelector('#table');
    const table  = document.createElement('table');
    const createElementButton = document.createElement('button');

    for (let i = 0; i < quantityRow; i++) {
        const tr = table.insertRow(0);

        for (let j = 0; j < quantityCell; j++) {
            const td = tr.insertCell(0);

            td.style.border = '1px solid #777';
            td.style.width  = width + 'px';
            td.style.height = height + 'px';
        }
    }

    createElementButton.innerHTML           = 'Поменять цвета';
    table.style.borderCollapse = 'collapse';

    table.addEventListener('click', e => {
        if (e.target.tagName === 'TD') applyColor(e.target);
    });

    createElementButton.addEventListener('click', () => {
        const allTd = table.getElementsByTagName('td');

        for (let i = 0; i < allTd.length; i++) {
            applyColor(allTd[i]);
        }
    });

    table.setAttribute('class', 'game');
    tableDiv.appendChild(table);
    createElementButton.setAttribute('class', 'createElementButton');
    tableDiv.appendChild(createElementButton);
}

function applyColor(value) {
    if (value.className !== 'black') {
        value.style.background = 'black';
        value.className        = 'black';
    } else {
        value.style.background = 'white';
        value.className        = 'white';
    }
}

const startNewGameButton = document.querySelector('#startNewGame');
startNewGameButton.addEventListener('click', () => renderTable());






