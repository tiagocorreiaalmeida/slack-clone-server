import * as envVar from 'env-var';

type ENVIRONMENT_TYPE = 'test' | 'production' | 'development';

const PORT = envVar.get('PORT').default('4000').required().asPortNumber();
const ENVIRONMENT: ENVIRONMENT_TYPE = envVar
  .get('NODE_ENV')
  .default('development')
  .required()
  .asEnum(['development', 'test', 'production']);

const ACCESS_TOKEN_SECRET = envVar.get('ACCESS_TOKEN_SECRET').required().asString();
const ACCESS_TOKEN_DURATION = envVar.get('ACCESS_TOKEN_DURATION').required().asInt();
const REFRESH_TOKEN_SECRET = envVar.get('REFRESH_TOKEN_SECRET').required().asString();
const REFRESH_TOKEN_DURATION = envVar.get('REFRESH_TOKEN_DURATION').required().asInt();

const REDIS_PORT = envVar.get('REDIS_PORT').required().asPortNumber();
const REDIS_PASSWORD = envVar.get('REDIS_PASSWORD').required().asString();
const REDIS_HOST = envVar.get('REDIS_HOST').required().asString();

const env = {
  PORT,
  ENVIRONMENT,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_DURATION,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_DURATION,
  REDIS_PORT,
  REDIS_HOST,
  REDIS_PASSWORD,
};

export { env };
