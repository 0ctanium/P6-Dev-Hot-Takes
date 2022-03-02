# Hot Takes API

[![type-coverage](https://img.shields.io/badge/dynamic/json.svg?label=type-coverage&prefix=%E2%89%A5&suffix=%&query=$.typeCoverage.atLeast&uri=https%3A%2F%2Fraw.githubusercontent.com%2F0ctanium%2FP6-Dev-Hot-Takes%2Fmain%2Fpackage.json)](https://github.com/0ctanium/P6-Dev-Hot-Takes)

## Installation

### Install dependencies
With yarn (prefer yarn)
```bash
yarn install
```

With npm
```bash
npm install
```

### Configure environement variables

Copy example file to production file
```bash
mv .env.dist .env
```

Edit variable with correct values in the `.env` file


## Start server
### Start production server

Build distant files
```bash
yarn build
```

Start the server
```bash
yarn start
```
### Start dev server
```bash
yarn dev
```


## Configuration

All environment variables must be set in the `.env` file

| Name            | Description                                                                                                                | Type                            | Required | Default Value |
|-----------------|----------------------------------------------------------------------------------------------------------------------------|---------------------------------|----------|---------------|
| DB_URI          | MongoDB URI (https://docs.mongodb.com/manual/reference/connection-string/)                                                 | string                          | **YES**  |               |
| PORT            | HTPP port the web server will be exposed                                                                                   | number                          | NO       | 3000          |
| DATA_DIR        | Directory the images will be saved into                                                                                    | string                          | NO       | data/images/  |
| TOKEN_SECRET    | Authentication encryption key                                                                                              | string                          | **YES**  |               |
| TOKEN_EXPIRY    | Session validity time                                                                                                      | number                          | NO       | 86400 (24h)   |
| TOKEN_ALGORITHM | The algorithm JWT will use to encrypt tokens (https://www.scottbrady91.com/jose/jwts-which-signing-algorithm-should-i-use) | jsonwebtoken.Algorithm (string) | NO       | HS256         |
