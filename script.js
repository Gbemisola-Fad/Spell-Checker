// ── Dictionary ────────────────────────────────────────────────────────────
// Inline fallback dictionary so the app works without a server.
// Replace / extend with your own words.json fetch if needed.
let dictionary = [
  "a","about","above","across","act","add","age","ago","air","all","allow",
  "almost","along","already","also","always","among","amount","an","and",
  "another","answer","any","anything","appear","are","area","around","as",
  "ask","at","back","be","because","become","before","begin","being","best",
  "better","between","big","book","both","bring","build","but","by","call",
  "can","cause","change","check","clear","close","come","common","could",
  "country","day","did","different","do","does","doing","done","down","each",
  "end","English","enough","even","every","example","face","fact","far",
  "feel","few","find","first","for","form","found","from","get","give","go",
  "good","great","group","had","have","he","help","her","here","high","him",
  "his","home","how","however","if","in","into","is","it","its","just",
  "keep","know","large","last","later","leave","less","let","like","line",
  "list","little","long","look","made","main","make","man","many","may",
  "me","mean","might","more","most","move","much","must","my","need","never",
  "new","next","no","not","now","of","off","often","old","on","one","only",
  "open","or","other","our","out","over","own","part","people","place","plan",
  "point","possible","put","rather","really","right","same","say","see",
  "seem","set","she","should","show","side","since","small","so","some",
  "something","soon","still","such","take","tell","than","that","the","their",
  "them","then","there","these","they","thing","think","this","those","though",
  "through","time","to","too","try","turn","under","until","up","use","very",
  "want","was","way","we","well","were","what","when","where","which","while",
  "who","why","will","with","word","work","world","would","write","year","you",
  "your"
];

// Optionally try to load words.json (only works when served over HTTP)
try {
  const res = await fetch("./words.json");
  if (res.ok) {
    const data = await res.json();
    if (Array.isArray(data) && data.length) {
      dictionary = data;
      console.log("Dictionary loaded from words.json:", dictionary.length, "words");
    }
  }
} catch (_) { /* silently use inline dictionary */ }

// ── DOM refs ──────────────────────────────────────────────────────────────
const textInput  = document.getElementById("text-input");
const checkBtn   = document.getElementById("check-btn");
const resultsDiv = document.getElementById("results");

// Clear results when user types
textInput.addEventListener("input", () => { resultsDiv.innerHTML = ""; });
checkBtn.addEventListener("click", handleSpellCheck);

// ── THE MISSING FUNCTION (this was the bug) ───────────────────────────────
function getMisspelledWords(text, dict) {
  const tokens = text.toLowerCase().match(/\b[a-z']+\b/g);
  if (!tokens) return [];
  const lowerDict = dict.map(w => w.toLowerCase());
  return [...new Set(tokens)].filter(w => !lowerDict.includes(w));
}

// ── Core logic ────────────────────────────────────────────────────────────
function handleSpellCheck() {
  const text = textInput.value.trim();
  if (!text) {
    resultsDiv.innerHTML = `<span class="notice">Please enter some text.</span>`;
    return;
  }
  displayResults(getMisspelledWords(text, dictionary));
}

function displayResults(misspelledWords) {
  resultsDiv.innerHTML = "";

  if (misspelledWords.length === 0) {
    resultsDiv.innerHTML = `<span class="success">✓ No spelling mistakes found.</span>`;
    return;
  }

  const title = document.createElement("p");
  title.textContent = "Misspelled words:";
  resultsDiv.appendChild(title);

  const list = document.createElement("ul");

  misspelledWords.forEach(word => {
    const item = document.createElement("li");

    const wordText = document.createElement("span");
    wordText.textContent = word;
    wordText.className = "misspelled-word";
    item.appendChild(wordText);

    const addBtn = document.createElement("button");
    addBtn.textContent = "Add to dictionary";
    addBtn.className = "add-btn";
    addBtn.addEventListener("click", () => {
      if (!dictionary.includes(word)) dictionary.push(word);
      handleSpellCheck();
    });

    item.appendChild(addBtn);
    list.appendChild(item);
  });

  resultsDiv.appendChild(list);
}