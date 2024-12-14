import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DeveloperEntity, GameEntity, Genres, UserEntity } from '@client-side/shared-lib';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-game-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './game-form.component.html',
  styleUrl: './game-form.component.css',
})
export class GameFormComponent implements OnInit {
  baseUrl = environment.apiUrl;
  genres = Object.values(Genres);
  developers: DeveloperEntity[] = [];
  loggedInUser: UserEntity| null = null;
  gameForm!: FormGroup;
  gameToEdit: GameEntity | null = null;


  constructor(private router: Router, private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loggedInUser = this.authService.getUser();

    this.gameForm = this.fb.group({
      name: ['', Validators.required],
      genre: ['', Validators.required],
      developer: [null, Validators.required],
      releaseDate: ['', Validators.required],
    });

    fetch(`${this.baseUrl}/developer/user`, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    })
      .then((response) => response.json())
      .then((data: DeveloperEntity[]) => (this.developers = data));

    const gameId = this.router.url.split('/').pop();
    if (gameId && !isNaN(Number(gameId)) && Number(gameId) > 0) {
      fetch(`${this.baseUrl}/game/id/${gameId}`, {
        headers: {
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      })
        .then((response) => response.json())
        .then((data: GameEntity) => {
          this.gameToEdit = data;
          this.gameForm.patchValue({
            name: data.name,
            genre: data.genre,
            developer: data.developer.name,
            releaseDate: data.releaseDate,
          });
        });
    }
  }

  submitForm(): void {
    if (this.gameForm.invalid) {
      Object.keys(this.gameForm.controls).forEach(key => {
        const controlErrors = this.gameForm.get(key)?.errors;
        if (controlErrors != null) {
          console.log(`Key control: ${key}, Errors:`, controlErrors);
        }
      });
      console.log('Invalid form');
      return;
    }

    if (this.gameToEdit) {
      this.updateGame();
    } else {
      this.createGame();
    }
  }

  updateGame(): void {
    let game = this.gameForm.value;
    game.id = this.gameToEdit?.id;
    game.developer = this.gameToEdit?.developer;
    fetch(`${this.baseUrl}/game/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
      body: JSON.stringify(game),
    })
    .then((response) => response.json())
    .then((data) => {
      game = data;
      this.router.navigate(['/games/', game.id]);
    });
  }

  createGame(): void {
    const game = this.gameForm.value;
    game.developer = this.developers.find(developer => developer.name === game.developer);
    fetch(`${this.baseUrl}/game`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
      body: JSON.stringify(game),
    })
    .then((response) => response.json())
    .then((data) => {
      this.router.navigate(['/games/platform-form', data.id]);
    });
  }
}
