class Calculator {
    constructor(previousWork, currentWork){
        this.previousWork = previousWork;
        this.currentWork = currentWork;
        this.clear();
    }

    clear(){
        this.previous = '';
        this.current = '';
        this.operation = undefined;
    }

    appendNumber(number){  
        if(number === '.' && this.current.includes('.')) return
        this.current = this.current + number
    }

    chooseOperations(operation){
        if(this.current === '') return
        if (this.previous !== '') {
            this.compute();
        }
        this.operation = operation
        this.previous = this.current
        this.current = ''
    }

    compute (){
        let computation 
        const prev = parseFloat(this.previous);
        const current = parseFloat(this.current);
        if (isNaN(prev) || isNaN(current)) return

        switch(this.operation){
            case "+":
                computation = prev + current
                break
            case "-":
                computation = prev - current
                break
            case "×":
                computation = prev * current
                break
            case "÷":
            computation = prev / current
            break
            default:
             return
        }
        this.current = computation
        this.operation = undefined
        this.previous = ''
    }

    updateDisplay() {
        this.currentWork.innerText = this.current;
        this.previousWork.innerText = this.previous;

        if(this.operation != null) {
            this.previousWork.innerHTML = 
            `${this.previous}  <i class="symbol">${this.operation}</i>`
        }
    }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]")
const clearButton = document.querySelector("[data-clear]")
const currentTextElement = document.querySelector("[data-current-operand]");
const previousTextElement = document.querySelector("[data-previous-operand]");

const calculator = new Calculator(previousTextElement, currentTextElement);

numberButtons.forEach(button => {
    button.addEventListener("click", () =>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener("click", () =>{
        calculator.chooseOperations(button.innerText);
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener("click", button => {
    calculator.compute();
    calculator.updateDisplay();
})

clearButton.addEventListener("click", button => {
    calculator.clear();
    calculator.updateDisplay();
})