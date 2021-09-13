const buttonArea = document.querySelector(".buttonArea")
const screenArea = document.querySelector(".screenArea")
const equationArea = document.querySelector(".equationArea")
const evalArea = document.querySelector(".evalArea")

let currentSelection = [];
let equation = [""];
let tempAnswer;
let answer;

let buttons = ["zero", "one", "two", "three", "four", "five", 
    "six", "seven", "eight", "nine", "plus", "minus", "multi", 
    "divide", "clear", "dot", "equil", "back"]

for(let i = 0; i < buttons.length; i++){
    const button = document.createElement("button")
    button.classList.add(buttons[i])
    button.setAttribute('style', `
        grid-area: ${buttons[i]}; 
        `)
    buttonArea.appendChild(button)
}

const buttonZero = document.querySelector('.zero');
buttonZero.classList.add('_0');
buttonZero.textContent = '0';

const buttonDot = document.querySelector('.dot');
buttonDot.classList.add('_dot');
buttonDot.textContent = ".";

const buttonOne = document.querySelector('.one');
buttonOne.textContent = "1";
buttonOne.classList.add('_1');

const buttonTwo = document.querySelector('.two');
buttonTwo.textContent = "2";
buttonTwo.classList.add('_2');

const buttonThree = document.querySelector('.three');
buttonThree.textContent = "3";
buttonThree.classList.add('_3');

const buttonFour = document.querySelector('.four');
buttonFour.textContent = "4";
buttonFour.classList.add('_4');

const buttonFive = document.querySelector('.five');
buttonFive.textContent = "5";
buttonFive.classList.add('_5');

const buttonSix = document.querySelector('.six');
buttonSix.textContent = "6";
buttonSix.classList.add('_6');

const buttonSeven = document.querySelector('.seven');
buttonSeven.textContent = "7";
buttonSeven.classList.add('_7');

const buttonEight = document.querySelector('.eight');
buttonEight.textContent = "8";
buttonEight.classList.add('_8');

const buttonNine = document.querySelector('.nine');
buttonNine.textContent = "9";
buttonNine.classList.add('_9');

const buttonClear = document.querySelector('.clear');
buttonClear.textContent = "Clear";
buttonClear.classList.add('_del');

const buttonPlus = document.querySelector('.plus');
buttonPlus.textContent = "+";
buttonPlus.classList.add('_plus');

const buttonMinus = document.querySelector('.minus');
buttonMinus.textContent = "-";
buttonMinus.classList.add('_minus');

const buttonMulti = document.querySelector('.multi');
buttonMulti.textContent = "*";
buttonMulti.classList.add('_multi');

const buttonDivide = document.querySelector('.divide');
buttonDivide.textContent = "/";
buttonDivide.classList.add('_divide');

const buttonEquils = document.querySelector('.equil');
buttonEquils.textContent = "=";
buttonEquils.classList.add('_equil');

const buttonBack = document.querySelector('.back');
buttonBack.textContent = "←";
buttonBack.classList.add('_Backspace');


const buttonArray = buttonArea.querySelectorAll('button');

window.addEventListener('keydown', e => {
    key = e.key;
    switch(key) {
        case '.':
            key = 'dot';
            break;
        case '+':
            key = "plus";
            break;
        case '-':
            key = "minus";
            break;
        case '*':
            key = "multi";
            break;
        case '/':
            key = 'devide'
            break;
    }
    const keyEle = document.querySelector(`._${key}`)
    if(keyEle){
        console.log(keyEle)
        loadButtonPress(keyEle);
        evalArea.textContent = calculate(equation); 
    }
})

buttonArray.forEach(item => {
    item.addEventListener('mousedown', () => {
        item.classList.toggle('buttonClick')
        loadButtonPress(item);
        evalArea.textContent = calculate(equation); 
    })
    item.addEventListener('mouseup', () => {
        item.classList.toggle('buttonClick')
    })
    item.addEventListener('mouseleave', () => {
        item.classList.remove('buttonClick')
    })
})

function calculate(equation) {
    let constructionEquation = equation.slice();
    while(constructionEquation.length > 1){
        let multiplyIndex = constructionEquation.findIndex(item => item == '*')
        let divideIndex = constructionEquation.findIndex(item => item == '/') 
        let addIndex = constructionEquation.findIndex(item => item == '+') 
        let minusIndex = constructionEquation.findIndex(item => item == '-') 
        
        if(multiplyIndex > divideIndex && multiplyIndex != -1){
            let firstNum = constructionEquation[multiplyIndex-1];
            let secondNum = constructionEquation[multiplyIndex+1];
            if(secondNum == '') {return 'NaN';}
            constructionEquation[multiplyIndex-1] = multiply(+firstNum, +secondNum)
            constructionEquation.splice(multiplyIndex, 2)
        } else if(multiplyIndex < divideIndex && divideIndex != -1){
            let firstNum = constructionEquation[divideIndex-1];
            let secondNum = constructionEquation[divideIndex+1];
            if(secondNum == '') {return 'NaN';}
            if(+secondNum == 0){ return "Hey, devide by zero is a No No, aka Undefined"}
            constructionEquation[divideIndex-1] = divide(+firstNum, +secondNum)
            constructionEquation.splice(divideIndex, 2) 
        } else if(addIndex > minusIndex && addIndex != -1){
            let firstNum = constructionEquation[addIndex-1];
            let secondNum = constructionEquation[addIndex+1];
            if(secondNum == '') {return 'NaN';}
            constructionEquation[addIndex-1] = sum(+firstNum, +secondNum)
            constructionEquation.splice(addIndex, 2)
        } else if(addIndex < minusIndex && minusIndex != -1){
            let firstNum = constructionEquation[minusIndex-1];
            let secondNum = constructionEquation[minusIndex+1];
            if(secondNum == '') {return 'NaN';}
            constructionEquation[minusIndex-1] = subtract(+firstNum, +secondNum)
            constructionEquation.splice(minusIndex, 2) 
        } else {
            return "ERROR, NO OPERATION FOUND";
        }
    }
    if(+constructionEquation[0] > 100000 || +constructionEquation[0] < 0.00001 && +constructionEquation[0] != 0) {
        constructionEquation[0] = Number(constructionEquation[0]).toExponential();
    }
    return constructionEquation[0];
}



function loadButtonPress(button) {

    switch(button.textContent.toLowerCase()){
        case '.':
            let hasPeriod = currentSelection.some(period => period === ".")
            if(!hasPeriod) {
                if(currentSelection[0] == undefined) {
                    currentSelection.push('0');
                }
                currentSelection.push(button.textContent);
                equation[equation.length-1] = currentSelection.join('');
            }
            break;
        case '=':
        case 'clear':
            currentSelection = [];
            equation = [""];
            break;
        case '+':
        case '-':
        case '/':
        case '*':
            if(currentSelection[(currentSelection.length)-1] == '.') {
                currentSelection.push('0');
                equation[equation.length-1] = currentSelection.join('');
            }
            if(currentSelection[0] != undefined) {
                equation.push(button.textContent,"");
                currentSelection = [];
            }
            break;
        case '←':
            if(equation[equation.length-1] != ""){
                currentSelection.pop();
                equation[equation.length-1] = currentSelection.join('');
            } else {
                if(equation.length>1){
                    equation.pop();
                    equation.pop();     
                    currentSelection = equation[equation.length-1].split('')
                }
                
            }
            break;
        default:
            currentSelection.push(button.textContent);
            if(equation == undefined) { equation = [""] }
            equation[equation.length-1] = currentSelection.join('');
    }
    equationArea.textContent = equation.join('')

}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function sum(){
    let sum = 0;
    for (let i = 0; i < arguments.length; i++){
        sum += arguments[i];
    }
    return sum;
}

function subtract(a, b){
    return a - b;
}