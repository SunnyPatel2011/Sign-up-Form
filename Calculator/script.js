let display = document.getElementById('Display');
let historyContainer = document.getElementById('history');
let trashicon = document.getElementById('trashicon');
let Bracket = true;
function Result(value) {
    display.value += value;
}


function clearResult() {
    display.value = '';
}

function clearEntry() {
    display.value = display.value.substring(0, display.value.length - 1);
}


function calculate() {
    try {
        let expression = display.value;
        if (expression.includes('%')) {
            const parts = expression.split('%');
            const percentage = parseFloat(parts[0]);
            const number = parseFloat(parts[1]);
            let answer = (percentage / 100) * number;
            display.value = answer;
            let his = expression + ' = ' + answer;
            saveHistory(his);
        } else {

            let answer = eval(expression);
            display.value = answer;
            let his = expression + ' = ' + answer;
            saveHistory(his);
        }
    } catch (error) {
        display.value = 'Error';
    }
}

function saveHistory(his) {
    let history = document.createElement('p');
    let parts = his.match(/.{1,33}/g);
    history.textContent = parts.join('\n');
    historyContainer.appendChild(history);
}


function focusScreen() {
    display.focus();
}


function Result(val) {
    if (val === '()') {
        if (Bracket) {
            display.value += '(';
            Bracket = true;
        } else {
            display.value += ')';
            Bracket = false;
        }
        Bracket = !Bracket;
    } else {
        display.value += val;
    }
}


trashicon.addEventListener('click', deletehistory);
function deletehistory() {
    historyContainer.innerHTML = '';
    location.reload();
}

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if ((key >= '0' && key <= '9') || key === '.' || key === '+' || key === '-' || key === '*' || key === '/' || key === '(' || key === ')' || key === '%') {
        Result(key);
        focusScreen();

    } else if (key === 'Enter') {
        calculate();

    } else if (key === 'Backspace') {
        clearEntry();
        focusScreen();
    } else if (key === 'Escape') {
        clearResult();
        focusScreen();
    } else if (key === 'Delete') {
        deletehistory();
        focusScreen();
    }
});
