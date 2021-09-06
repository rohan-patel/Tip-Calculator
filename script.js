class TipCalculator {
  constructor(tipAmountValueTextElement, totalAmountValueTextElement) {
    this.tipAmountValueTextElement = tipAmountValueTextElement;
    this.totalAmountValueTextElement = totalAmountValueTextElement;
    this.reset();
  }

  reset() {
    this.tipAmountValue = "0.00";
    this.totalAmountVlaue = "0.00";
    billInputTextElement.value = "";
    peopleInputTextElement.value = "";
    customRateInputElement.value = "";
    this.billInput = undefined;
    this.customRate = undefined;
    this.peopleInput = undefined;
    this.resetButtonsBackground();
    this.updateDisplay();
  }

  setBillInput(billInput) {
    this.billInput = billInput;
    if (isNaN(this.billInput)) return;

    if (parseFloat(this.billInput) < 0) {
      billInputDivElement.classList.remove("green-border");
      billInputDivElement.classList.add("error-border");
      billInputError.style.visibility = "visible";
      this.billInvalid = true;
    } else {
      billInputDivElement.classList.remove("error-border");
      billInputDivElement.classList.add("green-border");
      billInputError.style.visibility = "hidden";
      this.billInvalid = false;
    }
  }

  setPeopleInput(peopleInput) {
    this.peopleInput = peopleInput;
    if (isNaN(this.peopleInput)) return;

    if (parseInt(this.peopleInput) <= 0 || this.peopleInput.includes(".")) {
      peopleInputDivElement.classList.remove("green-border");
      peopleInputDivElement.classList.add("error-border");
      peopleInputError.style.visibility = "visible";
      this.peopleInvalid = true;
    } else {
      peopleInputDivElement.classList.remove("error-border");
      peopleInputDivElement.classList.add("green-border");
      peopleInputError.style.visibility = "hidden";
      this.peopleInvalid = false;
    }
  }

  setRate(rate) {
    this.rate = rate;
    if (this.customRate != undefined) {
      customRateInputElement.value = "";
      this.customRate = undefined;
    }
  }

  setButtonBackground(id) {
    this.resetButtonsBackground();
    const buttonElement = document.getElementById(id);
    buttonElement.classList.remove("bg-dark");
    buttonElement.classList.add("bg-medium");
    this.setRate(buttonElement.value);
  }

  resetButtonsBackground() {
    rateButtonElements.forEach((button) => {
      if (button.classList.contains("bg-medium")) {
        console.log("true");
        button.classList.remove("bg-medium");
        button.classList.add("bg-dark");
      }
    });
  }

  setCustomRate(customRate) {
    this.customRate = customRate;
    if (isNaN(this.customRate)) return;
    if (this.rate != undefined) {
      this.resetButtonsBackground();
      this.rate = undefined;
    }

    if (parseFloat(this.customRate) < 0) {
      customRateInputElement.classList.remove("green-border-custom");
      customRateInputElement.classList.add("error-border-custom");
      this.rateInvalid = true;
    } else {
      customRateInputElement.classList.remove("error-border-custom");
      customRateInputElement.classList.add("green-border-custom");
      this.rateInvalid = false;
    }
  }

  compute() {
    const bill = parseFloat(this.billInput);
    if (this.rate == undefined) {
      var rate = parseFloat(this.customRate) / 100;
    } else if (this.customRate == undefined) {
      var rate = parseFloat(this.rate) / 100;
    } else {
      var rate = undefined;
    }
    const people = parseFloat(this.peopleInput);

    if (
      isNaN(bill) ||
      isNaN(rate) ||
      isNaN(people) ||
      this.billInvalid ||
      this.peopleInvalid ||
      this.rateInvalid
    ) {
      this.tipAmountValue = "0.00";
      this.totalAmountVlaue = "0.00";
      this.updateDisplay();
      return;
    }

    this.tipAmountValueFloat = ((bill * rate) / people).toFixed(2);
    this.totalAmountVlaueFLoat = ((bill + bill * rate) / people).toFixed(2);

    this.tipAmountValue = this.tipAmountValueFloat.toString();
    this.totalAmountVlaue = this.totalAmountVlaueFLoat.toString();

    this.updateDisplay();
  }

  updateDisplay() {
    this.tipAmountValueTextElement.innerText = "$" + this.tipAmountValue;
    this.totalAmountValueTextElement.innerText = "$" + this.totalAmountVlaue;
  }
}

const billInputTextElement = document.getElementById("bill-input");
const peopleInputTextElement = document.getElementById("people-input");
const rateButtonElements = document.querySelectorAll(".rate > button");
const customRateInputElement = document.getElementById("custom-rate");
const billInputDivElement = document.querySelector(".bill-input");
const peopleInputDivElement = document.querySelector(".people-input");
const billInputError = document.getElementById("bill-input-error");
const peopleInputError = document.getElementById("people-input-error");
const tipAmountValueTextElement = document.getElementById("tip-amount");
const totalAmountValueTextElement = document.getElementById("total-amount");

const tipCalculator = new TipCalculator(
  tipAmountValueTextElement,
  totalAmountValueTextElement
);

setInterval(() => {
  tipCalculator.compute();
}, 100);
