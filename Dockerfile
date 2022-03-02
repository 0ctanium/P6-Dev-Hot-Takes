FROM node:14-alpine AS BUILD

WORKDIR /opt/node

RUN apk update && apk --no-cache add python3 make g++

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy sources
COPY . .
# Build app
RUN npm run build

# Remove development dependencies
RUN npm prune --production

## this is stage two , where the app actually runs
FROM node:14-alpine

WORKDIR /opt/node

COPY --from=BUILD /opt/node ./

ENV PORT 3000

EXPOSE $PORT

CMD ["node","dist/index.js"]