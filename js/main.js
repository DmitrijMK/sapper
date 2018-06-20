const field = prompt('field', 100);
const bombs = prompt('bombs', 10);

if(!field || !bombs){
    let l = alert('please enter value');
    window.location.reload();
}

const table = document.getElementById('table');
const button = document.getElementById('startNewGame');

button.addEventListener('click', () => window.location.reload());
table.setAttribute('style', `width:${field * 3.2}px`);
game(bombs, field);






