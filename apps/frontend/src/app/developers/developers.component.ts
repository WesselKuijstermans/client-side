import { Component, OnInit } from '@angular/core';
import { DeveloperEntity } from '@client-side/shared-lib';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-developers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './developers.component.html',
  styleUrl: './developers.component.css'
})
export class DevelopersComponent implements OnInit {
  baseUrl = environment.apiUrl;
  developers: DeveloperEntity[] = [];
  isLoggedIn = false;

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit(): void {
    fetch(this.baseUrl + '/developer').then(res => res.json()).then(data => {
      this.developers = data;
    });
    this.isLoggedIn = this.authService.isLoggedIn();
  }

}
