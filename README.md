# API

## Configuration

Copy the .env.example to .env

```bash
cp .env.example .env
```

**It may be required to update the enviroment variables, to do so follow the table below for guidance**

| Variable               | Description                                  | Supported values              |
| ---------------------- | -------------------------------------------- | ----------------------------- |
| PORT                   | Port where the server will be launch         | Number between 0-65535        |
| NODE_ENV               | Environment where the server will run        | development, production, test |
| REDIS_HOST             | Redis host used by the server to connect     | Any valid host                |
| REDIS_PORT             | Redis port used by the server to connect     | Number between 0-65535        |
| REDIS_PASSWORD         | Redis password used by the server to connect | Any string value              |
| ACCESS_TOKEN_SECRET    | Secret used to protect access tokens         | Any string value              |
| ACCESS_TOKEN_DURATION  | Defines the access token duration            | Any number of miliseconds     |
| REFRESH_TOKEN_SECRET   | Secret used to protect refresh tokens        | Any string value              |
| REFRESH_TOKEN_DURATION | Defines the refresh token duration           | Any number of miliseconds     |

## Run API

## For development

```bash
docker-compose up -d
yarn dev
```

## For testing

```bash
yarn test
```
