# Customise Tokens

**Customise Tokens** is the initial process of breaking down the input text into smaller strings known as Tokens. This project leverages Docker Compose to simplify deployment and development.

---

## Features

- Easy token customization and management
- Scalable service architecture using Docker Compose
- Uses Redis for faster data fetching
- Redis pipeline implemented for faster data seeding

---

## Prerequisites

- Docker
- Docker Compose
- Redis (handled inside Docker Compose)

---

## Getting Started

### Clone the repository

```bash
git clone git@github.com:viditrv123/Custom_AI_Tokenizer.git
cd Custom_AI_Tokenizer

```
### Run with Docker Compose

```bash
docker-compose up --build

```

## API's

### Encoding API curl

```bash

curl --location 'http://localhost:3000/encoder' \
--header 'Content-Type: application/json' \
--data '{
    "text":"Hello, Shanaaya here"
}'

```

### Decoding API curl

```bash

curl --location 'http://localhost:3000/decoder' \
--header 'Content-Type: application/json' \
--data '{
   "encodedValues":[
        "44084.10000",
        "26.0",
        "1.0",
        "85338.10",
        "3322.000",
        "46.0",
        "107247.00",
        "1.0",
        "44278.0000"
    ]
}'

```
<img width="1389" height="760" alt="Screenshot 2025-08-12 203113" src="https://github.com/user-attachments/assets/6f8ad19b-e923-456b-be2e-e4ece2c12a0e" />



<img width="1384" height="788" alt="Screenshot 2025-08-12 203239" src="https://github.com/user-attachments/assets/5861e75d-730d-4582-91c4-7b3f6ae34b94" />

## Algorithm Explanation

When the server starts, it performs the following initialization steps:

1. **Dictionary Loading and Seeding**  
   The dictionary data is loaded from the [`wordlist-english`](https://www.npmjs.com/package/wordlist-english) npm package. All dictionary words are seeded into Redis using a Redis pipeline for efficient batch insertion.  
   Additionally, special characters and numbers are stored separately in Redis. Each unique character or token is assigned a unique numeric ID.  
   To enable easy decoding later, a reverse mapping from these unique numeric IDs back to their corresponding characters or tokens is also saved in Redis.

2. **Encoding Process**  
   When the encoder API route is called with input text, the text is broken down into smaller tokens that exist in the dictionary. Each token is replaced by its unique numeric ID from Redis.  
   To maintain case sensitivity, an encoding scheme is used where:  
   - `0` denotes lowercase  
   - `1` denotes uppercase  
   This case information is appended as a decimal fraction to the token’s numeric ID.  
   For example, a token with ID `123` and uppercase would be represented as `123.1`, while lowercase would be `123.0`.

3. **Decoding Process**  
   When the decoder API route receives encoded tokens, each numeric ID is split at the decimal point to separate the token ID and the case flag.  
   The token ID is used to fetch the corresponding character or token from Redis. Then, based on the case flag (`0` or `1`), the token is converted back to lowercase or uppercase accordingly.

---

This approach ensures fast token lookups using Redis, efficient bulk seeding via pipelines, and case-sensitive encoding and decoding of input text.


