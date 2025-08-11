import Redis from "ioredis";
import Dictionary from "./dictionary.js";

class RedisClient {
  static instance = null;
  specialChars = [
    " ",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "-",
    "_",
    "=",
    "+",
    "[",
    "]",
    "{",
    "}",
    ";",
    ":",
    "'",
    '"',
    "\\",
    "|",
    ",",
    ".",
    "<",
    ">",
    "/",
    "?",
    "`",
    "~",
    `/`,
  ];

  constructor() {
    if (RedisClient.instance) {
      return RedisClient.instance;
    }

    this.redis = new Redis();
    RedisClient.instance = this;
  }

  async init() {
    await this.addDictionary();
    return this.redis;
  }

  async addDictionary() {
    const dictionary = new Dictionary().getDictionaryWord();
    const pipeline = this.redis.pipeline();

    this.specialChars.forEach((word, index) => {
      pipeline.hset("dictionary", word, index + 1);
      pipeline.hset("encoded-dictionary", index + 1, word);
    });

    dictionary.forEach((word, index) => {
      pipeline.hset(
        "encoded-dictionary",
        index + 1 + this.specialChars.length,
        word
      );
    });

    await pipeline.exec();
  }

  getClient() {
    return this.redis;
  }
}

export default RedisClient;
