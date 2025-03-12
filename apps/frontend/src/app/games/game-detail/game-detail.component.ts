import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameEntity, RatingEntity, UserEntity } from '@client-side/shared-lib';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game-detail.component.html',
  styleUrl: './game-detail.component.css',
})
export class GameDetailComponent implements OnInit {
  baseUrl = environment.apiUrl;
  game: GameEntity | null = null;
  loggedInUser: UserEntity | null = null;
  isCreator = false;
  isDeleting = false;
  isReviewing = false;
  newRating!: RatingEntity;

  constructor(public router: Router, public authService: AuthService) {}

  ngOnInit(): void {
    this.loggedInUser = this.authService.getUser();
    const id = this.router.url.split('/').pop();
    console.log(id);
    if (id !== undefined && parseInt(id, 10) > 0) {
      fetch(`${this.baseUrl}/game/id/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          this.game = data;
          this.isCreator =
            this.loggedInUser?.id === this.game?.developer.createdBy?.id;
        });
    }

    this.newRating = {
      rating: 0,
      review: '',
      user: this.loggedInUser,
      game: this.game as GameEntity,
      created: new Date(),
    };
  }

  delete(): void {
    this.isDeleting = true;
  }

  cancelDelete(): void {
    this.isDeleting = false;
  }

  confirmDelete(): void {
    fetch(`${this.baseUrl}/game/${this.game?.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    }).then(() => {
      this.router.navigate(['/games']);
    });
  }

  getPlatformNames(game: GameEntity | null): string {
    return (
      game?.platforms?.map((platform) => platform.platform?.name).join(', ') ||
      ''
    );
  }

  getAverageRating(): number {
    if (this.game?.ratings.length) {
      const average = this.game.ratings.reduce((acc, review) => acc + review.rating, 0) / this.game.ratings.length;
      return parseFloat(average.toFixed(2));
    }
    return 0;
  }

  cancelReview(): void {
    this.isReviewing = false;
  }

  submitReview(): void {
    if (this.newRating.rating === 0) {
      return;
    }
    fetch(`${this.baseUrl}/rating`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
      body: JSON.stringify({ ...this.newRating, game: this.game }),
    }).then(() => {
      this.isReviewing = false;
      if (this.hasReviewed() && this.game && this.game.ratings) {
        this.game.ratings = this.game.ratings.filter(
          (rating) => rating.user.id !== this.loggedInUser?.id
        );
      }
      this.game?.ratings.push(this.newRating);
    });
  }

  hasReviewed(): boolean {
    return this.game?.ratings.some( rating => rating.user.id === this.loggedInUser?.id) ?? false;
  }
}
