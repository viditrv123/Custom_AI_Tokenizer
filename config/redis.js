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
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
  ];

  constructor() {
    if (RedisClient.instance) {
      return RedisClient.instance;
    }

    this.redis = new Redis({
      host: "redis",
      port: 6379,
    });
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
      pipeline.hset("dictionary", word, index + 1 + this.specialChars.length);
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
