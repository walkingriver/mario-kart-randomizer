import { Component, OnInit } from '@angular/core';
import { IonButton, IonButtons, IonMenuButton, IonHeader, IonTitle, IonToolbar, IonContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [IonContent, IonToolbar, IonMenuButton, IonTitle, IonHeader, IonButton, IonButtons ],
})
export class HomeComponent  {

}
