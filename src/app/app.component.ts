import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NgFor } from '@angular/common';
import { RouterLinkActive, RouterLink } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, NgFor, RouterLinkActive, RouterLink],
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
    },
    {
      title: 'Randomizer',
      url: '/slots',
      icon: 'shuffle',
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'settings',
    },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
