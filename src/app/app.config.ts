import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { errorResponseInterceptor } from './core/interceptors/error-response.interceptor';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
    withFetch(),
    withInterceptors([ errorResponseInterceptor])
  ), provideAnimationsAsync(), provideToastr({
    timeOut: 5000,
    positionClass: 'toast-top-right',
    preventDuplicates: true,
  })
  ]
};
