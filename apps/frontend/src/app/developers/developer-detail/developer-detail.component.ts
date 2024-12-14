import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { DeveloperEntity, GameEntity, UserEntity } from '@client-side/shared-lib';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-developer-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './developer-detail.component.html',
  styleUrl: './developer-detail.component.css',
})
export class DeveloperDetailComponent implements OnInit {
  baseUrl = environment.apiUrl;
  developer: DeveloperEntity | null = null;
  isCreator = false;
  isDeleting = false;

  constructor(public router: Router, public authService: AuthService) {}

  ngOnInit(): void {
    const id = this.router.url.split('/').pop();
    console.log(id);
    if (id !== undefined && parseInt(id, 10) > 0) {
      fetch(`${this.baseUrl}/developer/id/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          this.developer = data;
          const user = this.authService.getUser();
          this.isCreator = user.id === this.developer?.createdBy.id;
        });
    }
  }

  delete(): void {
    this.isDeleting = true;
  }

  confirmDelete(): void {
    fetch(`${this.baseUrl}/developer/${this.developer?.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.authService.getToken()}`
      }
    }).then(() => {
      this.router.navigate(['/developers']);
    });
  }

  cancelDelete(): void {
    this.isDeleting = false;
  }

  getPlatformNames(game: GameEntity) : string {
    return game.platforms.map(platform => platform.platform?.name).filter(name => name).join(', ');
  }
}
