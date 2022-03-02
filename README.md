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