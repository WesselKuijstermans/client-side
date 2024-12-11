import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingComponent } from "./landing.component";
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  standalone: true,
  imports: [RouterModule, LandingComponent, NavbarComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
}
