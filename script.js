// This is a placeholder file which shows how you can access JSON data defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getMisspelledWords } from "./common.js";
let dictionary = [];

async function loadDictionary() {
  try {
    const response = await fetch("./words.json");
    dictionary = await response.json();
    console.log("Dictionary loaded:", dictionary.length);
  } catch (error) {
    console.error("Error loading dictionary:", error);
  }
}

loadDictionary();

const textInput = document.getElementById("text-input");
const checkBtn = document.getElementById("check-btn");
const resultsDiv = document.getElementById("results");

textInput.addEventListener("input", () => {
  resultsDiv.innerHTML = "";
});

checkBtn.addEventListener("click", handleSpellCheck);

function handleSpellCheck() {
  const text = textInput.value;

  if (!text) {
    resultsDiv.innerHTML = "Please enter some text.";
    return;
  }
  const misspelled = getMisspelledWords(text, dictionary);

  displayResults(misspelled);
}

function displayResults(misspelledWords) {

  if (misspelledWords.length === 0) {
    resultsDiv.innerHTML = "No spelling mistakes found.";
    return;
  }

  resultsDiv.innerHTML = "";

  const title = document.createElement("p");
  title.textContent = "Misspelled words:";
  resultsDiv.appendChild(title);

  const list = document.createElement("ul");

  misspelledWords.forEach(word => {

    const item = document.createElement("li");

    const wordText = document.createElement("span");
    wordText.textContent = word + " ";
    wordText.style.color = "red";
    wordText.style.fontWeight = "bold";
    item.appendChild(wordText);

    const addButton = document.createElement("button");
    addButton.textContent = "Add to dictionary";

    addButton.addEventListener("click", () => {

      if (!dictionary.includes(word)) {
        dictionary.push(word);
      }

      handleSpellCheck();
    });

    item.appendChild(addButton);
    list.appendChild(item);

  });

  resultsDiv.appendChild(list);
}

