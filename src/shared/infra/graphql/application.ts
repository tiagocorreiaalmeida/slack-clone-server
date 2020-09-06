import { createApplication } from 'graphql-modules';

import { userModule } from '../../../modules/user/infra/graphql/userModule';
import { workspaceModule } from '../../../modules/workspace/infra/graphql';

export const application = createApplication({
  modules: [userModule, workspaceModule],
});
