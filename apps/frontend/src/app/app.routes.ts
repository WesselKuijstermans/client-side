import { Route } from '@angular/router';
import { LandingComponent } from './landing.component';
import { AuthComponent } from './auth/auth.component';

export const appRoutes: Route[] = [
    { path: '', component: LandingComponent },
    { path: 'auth', component: AuthComponent }
];