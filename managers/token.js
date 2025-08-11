import RedisClient from "../config/redis.js";
import getCaseSensitiveString from "../utils/caseCodeConversion.js";
import findWordsInString from "../utils/wordMatching.js";
const redis = new RedisClient().getClient();

const encoder = async ({ text }) => {
  const dictionary = await redis.hgetall("dictionary");
  const wordString = text.match(/\w+|[^\w\s]|\s/g) || [];
  let result = [];
  wordString?.forEach((word) => {
    result = [...result, ...findWordsInString({ text: word, dictionary })];
  });
  return result;
};

const decoder = async ({ encodedValues = [] }) => {
  const dictionary = await redis.hgetall("encoded-dictionary");
  let sentence = "";
  encodedValues?.forEach((val) => {
    const [code, caseCode] = val.split("_");
    let decodedWord = dictionary[code];
    if (caseCode) {
      decodedWord = getCaseSensitiveString({ caseCode, word: decodedWord });
    }
    sentence += decodedWord;
  });
  return sentence;
};

const TokenManager = {
  encoder,
  decoder,
};

export default TokenManager;
