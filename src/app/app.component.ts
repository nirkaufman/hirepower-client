import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterOutlet],
  template: `
    <h1>Hire power</h1>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
