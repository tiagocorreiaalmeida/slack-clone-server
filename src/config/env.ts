import * as envVar from 'env-var';

type ENVIRONMENT_TYPE = 'test' | 'production' | 'development';

const PORT = envVar.get('PORT').default('4000').required().asPortNumber();
const ENVIRONMENT: ENVIRONMENT_TYPE = envVar
  .get('NODE_ENV')
  .default('development')
  .required()
  .asEnum(['development', 'test', 'production']);

const env = {
  PORT,
  ENVIRONMENT,
};

export { env };
