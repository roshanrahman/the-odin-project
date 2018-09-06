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
        handleOperatorClick(event.target);
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
    
    if(op1 === null) {
        op1 = Number(expressionString);
        currentOp = operator.getAttribute("value");
        expressionString = "";
    } else if(op1 !== null && op2 === null) {
        op1 = getResult(op1, op2, operator.getAttribute("value")); 
        op2 = Number(expressionString);
        currentOp = operator.getAttribute("value");
        expressionString = "";

    } else if(op1 !== null && op2 !== null) {
        op1 = getResult(op1, op2, operator.getAttribute("value"));
        currentOp = operator.getAttribute("value");
        expressionString = "";
        op2 = null;
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
    if(op2 == null) {
        return op1;
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