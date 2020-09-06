import { useCasesBootstrap } from './bootstrap/useCases';
import { startServer } from './shared/infra/graphql/server';
import { getContext } from './shared/infra/graphql/context';
import { authService } from './modules/user/services';

const useCases = useCasesBootstrap();
const context = getContext({ authService: authService, useCases });

startServer(context);
