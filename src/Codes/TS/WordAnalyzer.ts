class WordAnalyzer {
  words: string[];
  constructor(text: string) {
    this.words = text.replace(/[^\w\s]/g, "").split(" ");
  }

  getLongestWord = () => {
    return this.words.reduce(
      (longest, word) => (word.length > longest.length ? word : longest),
      ""
    );
  };

  getWordWithMostVowels = () => {
    const countVowels = (word: string) =>
      [...word.toLowerCase()].filter((char) => "aeiou".includes(char)).length;

    return this.words.reduce(
      (most, word) => (countVowels(word) > countVowels(most) ? word : most),
      ""
    );
  };
}

const analyzer = new WordAnalyzer("Clear communication creates connections.");
console.log("Longest word:", analyzer.getLongestWord()); // "communication"
console.log("Most vowels:", analyzer.getWordWithMostVowels()); // "communication"
