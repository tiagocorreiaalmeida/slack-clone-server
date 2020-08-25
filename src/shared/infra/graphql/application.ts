import { createApplication } from 'graphql-modules';

import { userModule } from '../../../modules/user/infra/graphql/userModule';

export const application = createApplication({
  modules: [userModule],
});
