import { Component, Input, OnInit } from '@angular/core';
import { User } from '../app.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})

export class NotificationComponent implements OnInit{
  @Input() notifications!: string[];
  @Input() user!: User;

  ngOnInit() {
    if (this.user.subscriptionType === 'Premium') {
      this.user.notifications.forEach(notification => {
        if (notification.includes('tiktok') || notification.includes('whatsapp')) {
          this.user.amountAvailable -= 5;
        }
      });
    }
  }
}