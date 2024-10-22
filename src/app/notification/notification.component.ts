import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../notification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notification',
  standalone: true, 
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  imports: [CommonModule]
})
export class NotificationComponent implements OnInit {
  notifications$: Observable<any[]>;

  constructor(private notificationService: NotificationService) {
    this.notifications$ = this.notificationService.getNotifications();
  }

  ngOnInit(): void {}
}
