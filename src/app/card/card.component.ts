import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { User } from '../app.component';
import { NotificationComponent } from '../notification/notification.component';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [UserComponent, NotificationComponent, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  view: 'user' | 'notifications' = 'user';
  @Input() user!: User; 
}