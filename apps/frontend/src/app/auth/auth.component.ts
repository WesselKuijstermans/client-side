import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  baseUrl = environment.apiUrl;
  isLoginMode = true;

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  login(event: SubmitEvent) {
    // console log the form values
    const form = event.target as HTMLFormElement;

    const formData = new FormData(form);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  register(event: SubmitEvent) {
    // console log the form values
    const form = event.target as HTMLFormElement;
    console.log(form.elements);
  }
}
