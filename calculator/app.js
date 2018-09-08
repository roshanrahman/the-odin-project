let clearBtn = document.querySelector("#clear");
let display = document.querySelector(".display");
let numberBtns = document.querySelectorAll(".number");
let operatorBtns = document.querySelectorAll(".operator");
let equalsBtn = document.querySelector(".equals");
let delBtn = document.querySelector("#clear");

//State variables

let expressionString = "";
let op1 = null;
let op2 = null;
let currentOp = null;

function logValues() {
    console.log(op1, op2, currentOp);
}

numberBtns.forEach(numberBtn => {
       numberBtn.addEventListener("click", () => {
        handleNumberClick(event.target);
        console.log("You clicked: " + event.target.getAttribute("value"));
    });
})

operatorBtns.forEach(operatorBtn => {
      operatorBtn.addEventListener("click", () => {
        handleOperatorClick(event.target.getAttribute("value"));
        console.log("You clicked: " + event.target.getAttribute("value"));
    });
})

equalsBtn.addEventListener("click", () => {
    handleEqualsClick();
});

delBtn.addEventListener("click", ()=> {
    op1 = null;
    op2 = null;
    currentOp = null;
    expressionString = "";
    display.textContent = "";
});

document.addEventListener("keypress", ()=> {
    handleKeyPress(event);
});

function handleNumberClick(number) {
    if(expressionString.length > 9) {
        return;
    }
    if(number.getAttribute("value") === "." && expressionString.indexOf(".") !== -1) {
        return;
    }
    if(number.getAttribute("value") == null) {
        return;
    }
    expressionString += (number.getAttribute("value"));
    display.textContent = expressionString;
}

function handleOperatorClick(operator) {
    if(op1 == null) {
        op1 = Number(expressionString);
        currentOp = operator;
        expressionString = "";
    } else { 
        op2 = Number(expressionString);
            op1 = getResult(op1, op2, currentOp);
            currentOp = operator;
            expressionString = "";
    }
    logValues();
    
}

function handleEqualsClick() {
    if(op1 === null || currentOp == null) {
        return;
    }
    op2 = Number(expressionString);
    expressionString = getResult(op1, op2, currentOp);
    display.textContent = expressionString;
    console.log(expressionString);
    op1 = null;
    op2 = null;
    currentOp = null;
}

function getResult(op1, op2, operator) {
    if(op2 == null || op1 == null) {
        return;
    }
    op1 = Number(op1);
    op2 = Number(op2);
    if(operator === "+") {
        return op1 + op2;
    }
    if(operator === "-") {
        return op1 - op2;
    }
    if(operator === "/") {
        return (Math.floor((op1 / op2) * 100000) / 100000);
    }
    if(operator === "*") {
        return op1 * op2;
    }
}

function handleKeyPress(keyEvent) {
    let keyPressed = String(keyEvent.key);
    console.log(keyPressed);
    if(['1','2','3','4','5','6','7','8','9','0'].includes((keyPressed))) {
        expressionString += keyPressed;
        display.textContent = expressionString;
    } else {
        if(keyPressed == '.') {
            expressionString += keyPressed;
        } else {
        if(['+', '-','/', '*'].includes(keyPressed)) {
            handleOperatorClick(keyPressed);
        } else if(['=', 'Enter'].includes(keyPressed)) {
            handleEqualsClick();
        } else if(['Backspace', 'Delete'].includes(keyPressed)) {
            expressionString = "";
            display.textContent = expressionString;
            op1 = null;
            op2 = null;
            currentOp = null;
        }
    }
}
}