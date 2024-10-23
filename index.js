// take input values from the form
// translation
// language
// send the data to the open ai api
// hide input screen and show response screen
// render response message from open ai api
// start over button to go back to input screen

const form = document.querySelector("form");
const startOverButton = document.querySelector(".start-over");

form.addEventListener("submit", submitTranslationData);
startOverButton.addEventListener("click", startOver);

function submitTranslationData(e) {
  e.preventDefault();
  console.log("Form submitted");
  document.querySelector(".translation-input").classList.add("hide");
  document.querySelector(".translation-output").classList.remove("hide");
}

function startOver() {
  console.log("Start over");
  document.querySelector(".translation-input").classList.remove("hide");
  document.querySelector(".translation-output").classList.add("hide");
}
