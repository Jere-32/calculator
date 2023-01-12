let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
let shouldResetScreen = false;

const numButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.getElementById("btn-equals");
const clearButton = document.getElementById("btn-clear");
const screen = document.getElementById("display");


numButtons.forEach((button) =>
  button.addEventListener("click", () => appendNumber(button.textContent))
)

operatorButtons.forEach((button) =>
  button.addEventListener("click", () => setOperation(button.textContent))
)
clearButton.addEventListener("click", clear);

function resetScreen() {
    screen.textContent = "";
    shouldResetScreen = false;
}

function appendNumber(number) {
    if(shouldResetScreen) resetScreen();
    screen.textContent += number;
}

function setOperation(operator) {
    firstOperand = screen.textContent;
    currentOperation = operator;
    shouldResetScreen = true
}

function clear() {
    screen.textContent = "";
    firstOperand = "";
    secondOperand = "";
    currentOperation = null;
}

document.addEventListener("keydown", keyboardInput);

function keyboardInput(e) {
    // Get the key that was pressed
    const key = e.key;
  
    // Check if the key is a number
    if (!isNaN(key)) {
        appendNumber(key);
    }
  
    // Check if the key is an operator
    switch (key) {
        case "+":
        case "-":
        case "*":
        case "/":
            setOperation(key);
            break;
        case "Enter":
        case "=":
            evaluate();
            break;
    }

}

    


function add(a, b) {
    return a + b
}
function substract(a, b) {
    return a - b
}
function divide(a, b) {
    return a / b
}
function multiply(a, b) {
    return a * b
}


function evaluate () {
    if (screen.textContent === "0" && currentOperation === "/") {
        screen.textContent = "undefined"
        shouldResetScreen = true
        return
    } else {
        secondOperand = screen.textContent;
        operate(currentOperation, firstOperand, secondOperand)
    }
}

equalsButton.addEventListener("click", evaluate);
secondOperand = screen.textContent;

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case "+":
            screen.textContent = add(a,b);
            break;
            
        case "-":
            screen.textContent = substract(a, b);
            break;
            
        case "*":
            screen.textContent = multiply(a, b);
            break;
            
        case "/":
            if (b === 0) return null
            else screen.textContent = divide(a, b);
            break;
            
        default:
            return null
        
    }
}