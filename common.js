import words from "./words.json" with { type: "json" };

export const getDictionarySize = () => words.length;

export const wordExists = (word) => {
  return words.includes(word.toLowerCase());
};

export function getMisspelledWords(text, dictionary = words) {
  if (!text) return [];

  const tokens = text.split(/\s+/).filter(Boolean);
  const misspelled = [];

  for (const token of tokens) {

    // Ignore capitalized words (proper nouns)
    if (/^[A-Z]/.test(token)) {
      continue;
    }

    // Split hyphen words
    const parts = token.replace(/-/g, " ").split(/\s+/);

    for (let part of parts) {

      // remove punctuation
      part = part.toLowerCase().replace(/[^a-z]/g, "");

      if (!part) continue;

      if (!dictionary.includes(part)) {
        misspelled.push(part);
      }
    }
  }

  return misspelled;
}
