import * as OpenAI from "openai";
// take input values from the form
// translation
// language
// send the data to the open ai api
// hide input screen and show response screen
// render response message from open ai api
// start over button to go back to input screen

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main(text, language) {
  messages = [
    {
      role: "system",
      content:
        "You are an expert tranlator. You specialise in translating from English to French, Spanish or Japanese",
    },
    {
      role: "user",
      content: `Please translate this text: ${text} into ${language}`,
    },
  ];
  const chatCompletion = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
    warmth: 0.8,
  });
  return chatCompletion.choices[0].message.content;
}

const form = document.querySelector("form");
const startOverButton = document.querySelector(".start-over");

form.addEventListener("submit", submitTranslationData);
startOverButton.addEventListener("click", startOver);

async function submitTranslationData(e) {
  e.preventDefault();
  console.log("Form submitted");
  const formData = gatherFormData();
  const translation = await main(
    formData.textToTranslate,
    formData.selectedLanguage
  );
  document.querySelector(".translation-input").classList.add("hide");
  document.querySelector(".translation-output").classList.remove("hide");
  document.querySelector(".original-text-output").innerHTML =
    formData.textToTranslate;
  document.querySelector(".translated-text-output").innerHTML = translation;
}

function startOver() {
  console.log("Start over");
  document.querySelector(".original-text-output").innerHTML = "";
  document.querySelector("#text-to-translate").value = "";
  document.querySelector(".translation-input").classList.remove("hide");
  document.querySelector(".translation-output").classList.add("hide");
}

function getLanguageSelection() {
  const radioOption = document.getElementsByName("languages");
  for (let i = 0; i < radioOption.length; i++) {
    if (radioOption[i].checked) {
      return radioOption[i].value;
    }
  }
}

function gatherFormData() {
  const textToTranslate = document.querySelector("#text-to-translate").value;
  const selectedLanguage = getLanguageSelection();
  return {
    textToTranslate,
    selectedLanguage,
  };
}
