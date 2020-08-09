# API

## Configuration

Copy the .env.example to .env

```bash
cp .env.example .env
```

**It may be required to update the enviroment variables, to do so follow the table below for guidance**

| Variable | Description                           | Supported values              |
| -------- | ------------------------------------- | ----------------------------- |
| PORT     | Port where the server will be launch  | Number between 0-65535        |
| NODE_ENV | Environment where the server will run | development, production, test |

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
