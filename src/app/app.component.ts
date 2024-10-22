import { Component } from '@angular/core';
import { UserComponent } from './user/user.component';
import { NotificationComponent } from './notification/notification.component';
import { NotificationService } from './notification.service';
import { data, socialNetworks } from './data'; 

@Component({
  selector: 'app-root',
  standalone: true, 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [UserComponent, NotificationComponent] 
})
export class AppComponent {
  activeTab: 'user' | 'notifications' = 'user';
  users = Object.values(data);

  constructor(private notificationService: NotificationService) {}

  showUser() {
    this.activeTab = 'user';
  }

  showNotifications() {
    this.activeTab = 'notifications';
  }

  addNewNotification(network: string, message: string): void {
    const isPremium = ['tiktok', 'whatsapp'].includes(network);
    this.notificationService.addNotification(network, message, isPremium);

    const platformData = socialNetworks.find(s => s.platform === network);

    if (platformData) {
      this.sendNotification(platformData);
    }
  }

  sendNotification(network: any) {
    const platformId = network.id;

    for (let user of this.users) {
      if (user.subscriptions.includes(platformId)) {

        if (network.platform === 'tiktok' || network.platform === 'whatsapp') {
          if (user.subscriptionType === 'premium') {
            if (user.amountAvailable >= 5) {
              user.amountAvailable -= 5;
              user.notifications.push(`${network.platform} sent a new ${network.type}`);
            } else {
              console.log(`${user.name} does not have enough balance to receive a notification from ${network.platform}`);
            }
          } else {
            console.log(`${user.name} cannot receive notifications from ${network.platform}`);
          }
        } else {

          user.notifications.push(`${network.platform} added a new ${network.type}`);
        }
      }
    }
  }
}
