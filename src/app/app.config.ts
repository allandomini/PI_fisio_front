import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { GoogleInitOptions, GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { environment } from './environments/enviroment';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { meuhttpInterceptor } from './services/http-interceptor.service';

const googleLoginOptions: GoogleInitOptions = {
  oneTapEnabled: false, // default is true
//  scopes: 'https://www.googleapis.com/auth/calendar.readonly'
};

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(),
    {
        provide: 'SocialAuthServiceConfig',
        useValue: {
            autoLogin: false,
            providers: [
                {
                    id: GoogleLoginProvider.PROVIDER_ID,
                    provider: new GoogleLoginProvider(environment.GOOGLE_CLIENT_ID, googleLoginOptions)
                },
            ],
            onError: (err: any) => {
                console.error(err);
            }
        } as SocialAuthServiceConfig,
    },
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(withFetch(), withInterceptors([meuhttpInterceptor])), 
    provideAnimationsAsync(), 
    provideAnimations()]
};
