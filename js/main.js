const isCorrectValue = n => !isNaN(parseFloat(n)) && isFinite(n) && n;
const field = Math.ceil(prompt('field', 100));
const bombs = Math.ceil(prompt('bombs', 10));
const table = document.getElementById('table');
const button = document.getElementById('startNewGame');

if(!isCorrectValue(field) || !isCorrectValue(bombs) || (bombs > field)){
    let l = alert('please enter correct value');
    window.location.reload();
} else game(bombs, field);

button.addEventListener('click', () => window.location.reload());
table.setAttribute('style', `width:${field * 3.2}px`);