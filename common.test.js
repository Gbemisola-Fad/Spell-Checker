import { getDictionarySize, wordExists, getMisspelledWords } from "./common.js";
import assert from "node:assert";
import test from "node:test";

test("Dictionary size is correct", () => {
  assert.ok(getDictionarySize() > 0);
});

test("Known word exists in dictionary", () => {
  assert.equal(wordExists("go"), true);
});

test("Unknown word does not exist in dictionary", () => {
  assert.equal(wordExists("helo"), false);
});

test("Correct words with punctuation are not flagged", () => {

  const dictionary = ["hello", "world"];

  const result = getMisspelledWords("hello, world!", dictionary);

  assert.deepEqual(result, []);

});

test("Incorrect word with punctuation is flagged", () => {

  const dictionary = ["hello", "world"];

  const result = getMisspelledWords("helo, world!", dictionary);

  assert.deepEqual(result, ["helo"]);

});

test("Hyphenated words are treated separately", () => {

  const dictionary = ["blue", "green"];

  const result = getMisspelledWords("blue-green", dictionary);

  assert.deepEqual(result, []);

});

test("Capitalized words are ignored", () => {

  const dictionary = ["is", "nice"];

  const result = getMisspelledWords("London is nice", dictionary);

  assert.deepEqual(result, []);

});
