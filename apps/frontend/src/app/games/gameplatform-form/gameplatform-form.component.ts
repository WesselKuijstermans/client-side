import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { GamePlatformEntity } from 'shared-lib/src/lib/entities/gameplatform';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlatformEntity } from 'shared-lib/src/lib/entities/platform';

@Component({
  selector: 'app-gameplatform-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gameplatform-form.component.html',
  styleUrl: './gameplatform-form.component.css',
})
export class GameplatformFormComponent implements OnInit {
  baseUrl = environment.apiUrl;
  gamePlatforms: GamePlatformEntity[] = [];
  gameId!: number;
  platforms: PlatformEntity[] = [];

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.gameId = parseInt(this.router.url.split('/').pop() || '', 10);

    fetch(`${this.baseUrl}/gameplatform/game/${this.gameId}`)
      .then((res) => res.json())
      .then((data) => {
        this.gamePlatforms = data;
        console.log(data);
      });

    fetch(`${this.baseUrl}/platform`)
      .then((res) => res.json())
      .then((data) => {
        this.platforms = data;
        console.log(data);
      });
  }

  addGamePlatform(platformId: string): void {
    const parsedId = parseInt(platformId, 10);
    const platform = this.platforms.find((p) => p.id === parsedId);
    if (platform) {
      this.gamePlatforms.push({ gameId: this.gameId, platformId: parsedId, game: null, platform: platform, releaseDate: new Date() });
    } else {
      console.error('Platform not found');
    }
  }

  delete(gamePlatform: GamePlatformEntity): void {
    fetch(
      `${this.baseUrl}/gameplatform/game/${gamePlatform.gameId}/platform/${gamePlatform.platformId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    ).then(() => {
      this.gamePlatforms = this.gamePlatforms.filter(
        (gp) => gp.platform?.id !== gamePlatform.platform?.id
      );
    });
  }

  save(formValue: any, gamePlatform: GamePlatformEntity): void {
    if (formValue.releaseDate) {
      gamePlatform.releaseDate = new Date(formValue.releaseDate);
      console.log(gamePlatform);
      fetch(`${this.baseUrl}/gameplatform`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          gameId: gamePlatform.gameId,
          platformId: gamePlatform.platformId,
          releaseDate: gamePlatform.releaseDate,
        }),
      });
    }
  }
}
