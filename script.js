let firstNb = null;
let secondNb = null;
let operator = null;
let shouldReset = true; // Should the next number clicked reset display?
let isError = false;
let isResultComputed = false; // Prevent backspace on result

const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

function displayOnDisplay(input) {
    txt = isError ? "Error" : input;
    let element = document.createTextNode(txt);
    display.appendChild(element);
    shouldReset = isError ? true : false;
}

function resetDisplay() {
    display.textContent = "";
}

function multiply() {
    return (firstNb * secondNb);
}

function divide() {
    if (secondNb === 0) {
        isError = true;
        return;
    } else {
        return (firstNb / secondNb);
    }
}

function sum() {
    return (firstNb + secondNb);
}

function subtract() {
    return (firstNb - secondNb);
}

function calculateResult() {
    let result = null;
    switch (operator) {
        case "x":
            result = multiply(firstNb, secondNb);
            break;
        case "/":
            result = divide(firstNb, secondNb);
            break;
        case "+":
            result = sum(firstNb, secondNb);
            break;
        case "-":
            result = subtract(firstNb, secondNb);
            break;
        default:
            resetDisplay();
    }

    return result;

}

function handleOperator(op) {
    if (operator !== null && op !== "=" && firstNb) {
        operator = op
    } else if (display.textContent === "") {
        window.alert("Some numbers first.")
    } else if (!firstNb && op !== "=") {
        firstNb = Number(display.textContent);
        operator = op;
        shouldReset = true;
    } else if (op === "=") {
        if (!firstNb) {
            window.alert("Some numbers first!")
        }
        if (firstNb !== null && operator !== null) {
            secondNb = Number(display.textContent);
            let res = calculateResult();
            isResultComputed = true;
            resetDisplay();
            displayOnDisplay(String(res));
            shouldReset = true
        }

    } else {
        isError = true;
        firstNb = null;
        secondNb = null;
        operator = null;
    }
}

function handleComma() {

}

function handleSignToggle() {

}

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();

        if (shouldReset) {
            isError = false;
            resetDisplay();
        }

        if (btn.classList.contains("operator")) {
            handleOperator(btn.textContent);
        } else if (btn.textContent === "+/-") {
            handleSignToggle();
        } else if (btn.textContent === ",") {
            handleComma();
        } else if (btn.textContent === "AC") {
            resetDisplay();
            shouldReset = true;
            operator = null;
            firstNb = null;
        } else {
            if (btn.classList.contains("forDisp")) {
                displayOnDisplay(btn.textContent);
            }
        }
    });
});
