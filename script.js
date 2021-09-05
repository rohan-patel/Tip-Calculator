// class TipCalculator {

//   constructor(billInputTextElement, rateElement, peopleInputTextElement) {
//     this.billInputTextElement = billInputTextElement
//     this.rateElement = rateElement
//     this.peopleInputTextElement = peopleInputTextElement
//   }

//   setValues() {
//     this.billInput = this.billInputTextElement.innerText
//     this.peopleInput - this.peopleInputTextElement.innerText
//   }
// }

const billInputTextElement = document.getElementById('bill-input')
const peopleInputTextElement = document.getElementById('people-input')
const rateButtonTextElement = document.querySelectorAll('.rate > button')
const customRateTextElement = document.getElementById('custom-rate')

let billInput
let peopleInput
let rate

function setBillInput(inputField) {
  billInput = inputField
  // console.log(billInput)
}

function setPeopleInput(inputField) {
  peopleInput = inputField
  // console.log(peopleInput)
}