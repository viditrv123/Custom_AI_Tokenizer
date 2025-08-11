const getCaseSensitiveString = ({ word, caseCode }) => {
  let result = "";

  for (let i = 0; i < word.length; i++) {
    const character = word[i];
    if (caseCode[i] === "1") {
      result += character.toUpperCase();
    } else if (caseCode[i] === "0") {
      result += character.toLowerCase();
    } else {
      // For non-letter or placeholder chars, just append as is
      result += character;
    }
  }

  return result;
};

export default getCaseSensitiveString;
