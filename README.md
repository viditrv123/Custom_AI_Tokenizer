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



