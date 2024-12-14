import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { DeveloperEntity } from '@client-side/shared-lib';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-developer-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './developer-form.component.html',
  styleUrl: './developer-form.component.css',
})
export class DeveloperFormComponent implements OnInit {
  baseUrl = environment.apiUrl;
  devId: number | null = null;
  developerToEdit: DeveloperEntity | null = null;
  formGroup: FormGroup;
  noName = false;
  noEmail = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.formGroup = this.fb.group({
      name: [''],
      email: [''],
    });
  }

  ngOnInit(): void {
    const id = this.router.url.split('/').pop();
    this.devId = id ? parseInt(id, 10) : null;
    console.log(this.devId);
    if (this.devId !== null && this.devId > 0) {
      fetch(`${this.baseUrl}/developer/id/${this.devId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          this.developerToEdit = data;
        });
    }
  }

  onSubmit(): void {
    let { name, email } = this.formGroup.value;
    if (!name) {
      this.noName = true;
      name = this.developerToEdit?.name;
    } else if (this.developerToEdit) {
      this.developerToEdit.name = name;
    }
    if (!email) {
      this.noEmail = true;
      email = this.developerToEdit?.email;
    } else if (this.developerToEdit) {
      this.developerToEdit.email = email;
    }
    if (this.devId !== null && this.devId > 0) {
      fetch(`${this.baseUrl}/developer`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${this.authService.getToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ developer: this.developerToEdit }),
      }).then(() => {
        this.router.navigate(['/developers']);
      });
    } else if (!this.noEmail && !this.noName) {
      fetch(`${this.baseUrl}/developer`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.authService.getToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      }).then(() => {
        this.router.navigate(['/developers']);
      });
    } else {
      console.error('Name and email are required');
    }
  }

  goBack(id: number | null): void {
    if (id != null && id > 0) {
      this.router.navigate([`/developers/${id}`]);
    } else {
      this.router.navigate(['/developers']);
    }
  }
}
