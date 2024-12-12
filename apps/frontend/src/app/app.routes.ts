import { Route } from '@angular/router';
import { LandingComponent } from './landing.component';
import { AuthComponent } from './auth/auth.component';
import { DevelopersComponent } from './developers/developers.component';
import { PlatformsComponent } from './platforms/platforms.component';
import { GamesComponent } from './games/games.component';
import { ProfileComponent } from './profile/profile.component';

export const appRoutes: Route[] = [
    { path: '', component: LandingComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'developers', component: DevelopersComponent },
    { path: 'platforms', component: PlatformsComponent },
    { path: 'games', component: GamesComponent },
    { path: 'profile', component: ProfileComponent },
];