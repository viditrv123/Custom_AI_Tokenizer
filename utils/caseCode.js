const getCaseCode = ({ word }) => {
  let caseCode = "";

  for (const char of word) {
    const code = char.charCodeAt(0);
    if (code >= 65 && code <= 90) {
      caseCode += "1";
    } else if (code >= 97 && code <= 122) {
      caseCode += "0";
    } else {
      caseCode += "0";
    }
  }

  return caseCode;
};

export default getCaseCode;
