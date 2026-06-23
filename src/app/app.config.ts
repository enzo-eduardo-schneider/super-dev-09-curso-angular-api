import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import * as router from '@angular/router';

import * as appRoutes from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), router.provideRouter(appRoutes.routes)],
};
