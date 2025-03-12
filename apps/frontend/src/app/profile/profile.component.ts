import { Component } from '@angular/core';
import {
  DeveloperEntity,
  GameEntity,
  RatingEntity,
  UserEntity,
} from '@client-side/shared-lib';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { PlatformEntity } from 'shared-lib/src/lib/entities/platform';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  private readonly baseUrl = environment.apiUrl;
  public loggedInUser: UserEntity | null = null;
  public activeTab = 'games';
  public games: GameEntity[] = [];
  public developers: DeveloperEntity[] = [];
  public platforms: PlatformEntity[] = [];
  public reviews: RatingEntity[] = [];

  constructor(public authService: AuthService) {
    this.loggedInUser = authService.getUser();
    const token = this.authService.getToken();
    fetch(`${this.baseUrl}/developer/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Developers: ', data);
        this.developers = data;
        for (const developer of this.developers) {
          for (const game of developer.games) {
            game.developer = developer;
            this.games.push(game);
          }
        }
        console.log('Games: ', this.games);
      });
    fetch(`${this.baseUrl}/rating/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Ratings: ', data);
        this.reviews = data;
      });
  }

  changeTab(tab: string): void {
    this.activeTab = tab;
  }
}
