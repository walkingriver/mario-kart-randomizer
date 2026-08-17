import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
})
export class AppComponent {
  readonly navItems = [
    { title: 'Home', url: '/home' },
    { title: 'Randomizer', url: '/slots' },
    { title: 'Settings', url: '/settings' },
  ];
}
