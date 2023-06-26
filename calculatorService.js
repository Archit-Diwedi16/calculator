let flag = false;
let inputValue = '';
let num1 = '';
let num2 = '';
let operator = ''
let operators = ['+', '-', '*', '/'];

// function to check typed character is number or not
function isNum(char) {
    return /^\d$/.test(char);
}

// function to perform calculations.
function calculate() {
    switch (operator) {
        case '+':
            return parseFloat(num1) + parseFloat(num2);
        case '-':
            return parseFloat(num1) - parseFloat(num2);
        case '*':
            return parseFloat(num1) * parseFloat(num2);
        case '/':
            if(num1==0){
                return 'infinite';
            }
            return parseFloat(num1) / parseFloat(num2);
    }

}

// Main function to perform activities
function getValue(key) {
    if (isNum(key)) {
        inputValue += key;
    }

    else if(key=='00' && inputValue!=''){
        inputValue+=key;
    }

    else if(key=='.'){
        if(inputValue==''){
            inputValue+=0;
        }
        inputValue+=key;
    }

    else if (key == 'Escape' || key == 'AC') {
        flag = false;
        inputValue = '';
        num1 = '';
        num2 = '';
        operator = '';
    }

    else if ((key == 'Backspace' || key == 'Delete' || key == '<~') && inputValue != '') {
        inputValue = inputValue.substring(0, inputValue.length - 1);
    }

    else if (key == '+/-' || (key == '-' && inputValue == '')) {
        if (!inputValue.includes('-')) {
            inputValue = '-' + inputValue;
        }
    }

    else if (operators.includes(key) && inputValue != '') {
        num1 = inputValue;
        operator = key;
        inputValue = ''
        flag = true
    }

    else if ((key == '=' || key == 'Enter') && flag) {
        num2 = inputValue;
        flag = false;
        temp = calculate();
        inputValue = temp;
    }

    document.getElementById('input').value = inputValue
}


// If user uses direct numpad or keyboard to perform calculations
document.addEventListener("keydown", function (event) {
    getValue(event.key);
})

//If user uses numpad of application to perform calculations.
const buttonsContainers = document.getElementById("buttons");
buttonsContainers.addEventListener('click', function (event) {
    if (event.pointerType === 'mouse') {
        getValue(event.target.innerText);
    }
})