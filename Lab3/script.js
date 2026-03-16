
// Get your display elements
const mainScreen = document.getElementById("main-screen");
const resultScreen = document.getElementById("result");

// Select all buttons inside the .board
const buttons = document.querySelectorAll(".board button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent.trim();

        // Skip the "=" button (we will handle that separately)
        if (button.id === "equal") return;

        // Handle Clear buttons
        if (button.id === "AC") {
            mainScreen.textContent = "0";
            resultScreen.textContent = "0";
            return;
        }

        if (button.id === "C") {
            mainScreen.textContent = mainScreen.textContent.slice(0, -1) || "0";
            return;
        }

        // Handle Numbers and Operators
        if (mainScreen.textContent === "0") {
            mainScreen.textContent = value;
        } else {
            mainScreen.textContent += value;
        }
    });
});
equal = document.getElementById("equal")
function is_operand(input){
    return input === "*" || input === "/" || input === "+" || input === "-" || input === "%";
}
function eval_result() {
    const operations = mainScreen.textContent;
    if(operations === "0")
        return "0";
    let tokens = operations.match(/(\d+\.?\d*)|([\+\-\*\/\%])/g);
    tokens = tokens.map(token => isNaN(token) ? token : parseFloat(token));
    let i =0
    while (i < tokens.length)
    {
        if(tokens[i] === "*" || tokens[i] === "/" || tokens[i] === "%"){
            const right = tokens[i+1]
            const left = tokens[i-1]
            if (is_operand(right) || is_operand(left))
                return "ERROR"
            let res = 0
            if (tokens[i] === "*" ) res = left * right
            if (tokens[i] === "/") res = left/ right
            if (tokens[i] === "%") res = left % right

            tokens.splice(i-1,3, res)
        }
        else
            i++
    }
    let result = tokens[0]
    for(let j= 1; j< tokens.length; j++){
        const operator =tokens[j]
        const next = tokens[j+1]
        if(operator === "+") {
            result += next;
            j++;
        }
        else if(operator === "-") {
            result += next;
            j++;
        }
        else return `ERROR ${tokens} `

    }
    return String(result)
}

equal.addEventListener("click", () => {if(mainScreen.textContent === "0"){resultScreen.textContent = "0";}
else {
    resultScreen.textContent = eval_result();
}})