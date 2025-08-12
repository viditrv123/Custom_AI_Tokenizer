const getCaseSensitiveString = ({ word, caseCode }) => {
  let result = "";

  for (let i = 0; i < word.length; i++) {
    const character = word[i];
    const charCode = character.charCodeAt(0);

    const isUpperAlpha = charCode >= 65 && charCode <= 90;
    const isLowerAlpha = charCode >= 97 && charCode <= 122;

    if (!isUpperAlpha && !isLowerAlpha) {
      result += character;
      continue;
    }

    if (caseCode[i] === "1") {
      result += character.toUpperCase();
    } else if (caseCode[i] === "0") {
      result += character.toLowerCase();
    } else {
      result += character;
    }
  }

  return result;
};

export default getCaseSensitiveString;
