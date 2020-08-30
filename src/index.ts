import { useCasesBootstrap } from './bootstrap/useCases';
import { startServer } from './shared/infra/graphql/server';

const useCases = useCasesBootstrap();

startServer(useCases);
