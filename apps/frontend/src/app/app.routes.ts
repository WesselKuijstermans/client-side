import { Route } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DevelopersComponent } from './developers/developers.component';
import { PlatformsComponent } from './platforms/platforms.component';
import { GamesComponent } from './games/games.component';
import { ProfileComponent } from './profile/profile.component';
import { DeveloperFormComponent } from './developers/developer-form/developer-form.component';
import { DeveloperDetailComponent } from './developers/developer-detail/developer-detail.component';
import { GameDetailComponent } from './games/game-detail/game-detail.component';
import { GameFormComponent } from './games/game-form/game-form.component';
import { GameplatformFormComponent } from './games/gameplatform-form/gameplatform-form.component';
import { AboutComponent } from './about/about.component';
import { LandingComponent } from './landing/landing.component';

export const appRoutes: Route[] = [
  { path: '', component: LandingComponent },
  { path: 'about', component: AboutComponent},
  { path: 'auth', component: AuthComponent },
  { path: 'developers', component: DevelopersComponent },
  { path: 'developers/:id', component: DeveloperDetailComponent },
  { path: 'developers/form/:id', component: DeveloperFormComponent },
  { path: 'games', component: GamesComponent },  
  { path: 'games/:id', component: GameDetailComponent },
  { path: 'games/form/:id', component: GameFormComponent },
  { path: 'games/platform-form/:id', component: GameplatformFormComponent },
  { path: 'platforms', component: PlatformsComponent },
  { path: 'profile', component: ProfileComponent },
];
