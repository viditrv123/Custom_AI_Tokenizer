import getCaseCode from "./caseCode.js";

const findWordsInString = ({ text, dictionary }) => {
  const matches = [];
  const n = text.length;
  const covered = new Array(n).fill(false);

  for (let start = 0; start < n; start++) {
    if (covered[start]) continue;

    let foundMatch = false;

    for (let end = n; end > start; end--) {
      const subStr = text.slice(start, end);
      if (dictionary[subStr.toLowerCase()]) {
        matches.push(
          `${dictionary[subStr.toLowerCase()]}_${getCaseCode({ word: subStr })}`
        );
        for (let i = start; i < end; i++) {
          covered[i] = true;
        }
        foundMatch = true;
        break;
      }
    }

    if (!foundMatch) {
      const char = text[start];
      if (dictionary[char]) {
        matches.push(
          di`${dictionary[char.toLowerCase()]}_${getCaseCode({ word: char })}`
        );
        covered[start] = true;
      }
    }
  }

  return matches;
};

export default findWordsInString;
