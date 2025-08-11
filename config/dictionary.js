import wordlist from "wordlist-english";
class Dictionary {
  constructor() {
    this.dictionary = wordlist["english"];
  }
  getDictionaryWord() {
    return this.dictionary;
  }
}

export default Dictionary;
