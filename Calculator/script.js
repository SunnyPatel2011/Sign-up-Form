let display = document.getElementById('inputBox'); 
let buttons = document.querySelectorAll('button');

let buttonsArray = Array.from(buttons);
let bracket = true;
let str = '';
let records = [];
buttonsArray.forEach(btn => {
    
    btn.addEventListener('click',(event) => {
        handleClick(event.target.innerHTML);
        
    });
    });
    
    document.addEventListener('keydown', (event)=> {
        const key = event.key;
        if(key >= '0' && key <= '9'){
            str += key;
            display.value = str;
        }else if(key === '.') {
            str += key;
            display.value = str;

        }else if(key === '+' || key === '-' || key === '*' || key === '/' || key === '(' || key === ')') {
            str += key;
            display.value = str;
        }else if(key === 'Enter') {
            let result = eval(str);
            let Calculation = str + '=' + result;
            records.push(Calculation);
            str = '';
            display.value = result;
        }else if(key === 'Backspace') {
            str = str.substring(0, str.length-1);
        display.value = str;
        }else if(key === 'Escape') {
            str = '';
            display.value = str;
        }else if(key === 'h') {
            let result = history();
            display.value = result;
        }
    });

    function handleClick(button){
       if(button == '⇐'){
           str = str.substring(0, str.length-1);
            display.value = str;

        }else if(button == 'AC'){
            str = '';
            display.value = str;

        }else if(button == '='){
            let result = eval(str);
            let Calculation = str + ' = ' + result;
            records.push(Calculation); 
            str = '';
            display.value = result;

        }else if(button == 'His') {
           let result = history();
           display.value = result;

        }else if(button == '()') {
            if(bracket) {
                str += '(';
                display.value = str;

            }else{
               str += ')';
               display.value = str;
            }
            bracket = !bracket;
            
        }else{
       str += button;
       display.value = str;
        }
    }

function history(){
 try {
    if(records.length === 0){
        return 'EMPTY';
    }
    else {
        let historyStr = records.shift();
        return historyStr;
    }
 } catch (error) {
    return 'Error';
}
}