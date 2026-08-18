import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { getBrowserPerformanceClasses } from './browser-capabilities';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
})
export class AppComponent implements OnInit {
  readonly navItems = [
    { title: 'Home', url: '/home' },
    { title: 'Randomizer', url: '/slots' },
    { title: 'Settings', url: '/settings' },
    { title: 'Attribution', url: '/attribution' },
  ];

  ngOnInit(): void {
    for (const className of getBrowserPerformanceClasses()) {
      document.documentElement.classList.add(className);
    }
  }
}
