import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { GameEntity } from '@client-side/shared-lib';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { FormsModule } from '@angular/forms';
import { PlatformEntity } from 'shared-lib/src/lib/entities/platform';
import { Genres } from 'shared-lib/src/lib/entities/game';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css',
})
export class GamesComponent implements OnInit {
  baseUrl = environment.apiUrl;
  highestRatedGames: GameEntity[] | null = null;
  games: GameEntity[] | null = null;
  filteredGames: GameEntity[] | null = null;
  platforms: string[] = [];
  isLoggedIn = false;
  selectedPlatform = '';
  selectedGenre = '';
  searchTerm = '';
  genres: string[] = Object.values(Genres);

  constructor(public router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    fetch(`${this.baseUrl}/game`)
      .then((response) => response.json())
      .then((data: GameEntity[]) => {
      this.games = data;
      this.filteredGames = data;
      });

    fetch(`${this.baseUrl}/game/highest-rated`)
      .then((response) => response.json())
      .then((data: GameEntity[]) => (this.highestRatedGames = data));

    fetch(`${this.baseUrl}/platform`)
      .then((response) => response.json())
      .then(
        (data: PlatformEntity[]) =>
          (this.platforms = data.map((platform) => platform.name))
      );
  }

  getPlatformNames(game: GameEntity): string {
    return game.platforms.map((platform) => platform.platform?.name).join(', ');
  }

  filterGames() {
    return this.filteredGames?.filter(game => {
      const searchTermLower = this.searchTerm.toLowerCase();
      return (
        (!this.searchTerm || game.name.toLowerCase().includes(searchTermLower) || game.developer.name.toLowerCase().includes(searchTermLower)) &&
        (!this.selectedGenre || game.genre === this.selectedGenre) &&
        (!this.selectedPlatform || game.platforms.some(platform => platform.platform?.name === this.selectedPlatform))
      );
    });
  }
}
