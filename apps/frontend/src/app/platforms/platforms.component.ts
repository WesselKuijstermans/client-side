import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { PlatformEntity } from 'shared-lib/src/lib/entities/platform';
import { AuthService } from '../auth/auth.service';
import { UserEntity } from '@client-side/shared-lib';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlatformType } from 'shared-lib/src/lib/entities/platformtype';

@Component({
  selector: 'app-platforms',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './platforms.component.html',
  styleUrls: ['./platforms.component.css']
})
export class PlatformsComponent implements OnInit {
  baseUrl = environment.apiUrl;
  platforms: PlatformEntity[] = [];
  loggedInUser: UserEntity | null = null;
  platformToDelete: number | null = null;
  isAdding = false;
  platformTypes = Object.values(PlatformType)
  submitted = false;
  platformForm = new FormGroup({ 
    'name': new FormControl('', { nonNullable: true, validators: [Validators.required] }), 
    'type': new FormControl('', { nonNullable: true, validators: [Validators.required] }), 
    'releaseDate': new FormControl('') 
  });

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    fetch(this.baseUrl + '/platform').then(res => res.json()).then(data => {
      this.platforms = data;
    });
    this.loggedInUser = this.authService.getUser();
  }

  confirmDelete(platformId: number): void {
    this.platformToDelete = platformId;
  }

  deletePlatform(platformId: number): void {
    fetch(`${this.baseUrl}/platform/${platformId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.authService.getToken()}`
      }
    }).then(() => {
      this.platforms = this.platforms.filter(platform => platform.id !== platformId);
    });
  }

  cancelDelete(): void {
    this.platformToDelete = null;
  }

  addPlatform(): void {
    this.submitted = true;
    const { name, type, releaseDate } = this.platformForm.value;
    const releaseDateValue = releaseDate === '' ? null : releaseDate;
    if (this.platformForm.invalid) {
      return;
    }
    fetch(`${this.baseUrl}/platform`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
      },
      body: JSON.stringify({ name, type, releaseDate: releaseDateValue })
    }).then(res => res.json()).then(data => {
      if (data && data.id) {
        this.platforms.push(data);
        this.platformForm.reset();
        this.isAdding = false;
        this.submitted = false;
      }
    });
  }
}
