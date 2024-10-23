const form = document.querySelector("form");
const startOverButton = document.querySelector(".start-over");

form.addEventListener("submit", submitTranslationData);
startOverButton.addEventListener("click", startOver);

async function submitTranslationData(e) {
  e.preventDefault();
  console.log("Form submitted");
  const formData = gatherFormData();

  try {
    const response = await fetch("http://localhost:3000/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: formData.textToTranslate,
        language: formData.selectedLanguage,
      }),
    });

    const data = await response.json();
    console.log("Data:", data);

    document.querySelector(".translation-input").classList.add("hide");
    document.querySelector(".translation-output").classList.remove("hide");
    document.querySelector(".original-text-output").innerHTML =
      formData.textToTranslate;
    document.querySelector(".translated-text-output").innerHTML =
      data.translation;
  } catch (error) {
    console.error("Error:", error);
  }
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
