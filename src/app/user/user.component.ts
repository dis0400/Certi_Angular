import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { data, socialNetworks } from '../data'; 

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  imports: [CommonModule]
})
export class UserComponent implements OnInit {
  activeTabs: { [key: string]: 'user' | 'notifications' } = {};
  users = Object.values(data);
  socialNetworks = socialNetworks; 

  ngOnInit() {
    this.users.forEach(user => {
      this.activeTabs[user.user_id] = 'user';
    });
  }

  showUserInfo(userId: string) {
    this.activeTabs[userId] = 'user';
  }

  showNotifications(userId: string) {
    this.activeTabs[userId] = 'notifications';
  }

  subscribe(user: any, network: any) {
    user.subscriptions.push(network.id);
  }

  unsubscribe(user: any, networkId: number) {
    user.subscriptions = user.subscriptions.filter((id: number) => id !== networkId);
  }

  getPlatformName(platformId: number) {
    const platform = this.socialNetworks.find(network => network.id === platformId);
    return platform ? platform.platform : '';
  }

  getFilteredNotifications(user: any) {
    if (user.subscriptionType === 'free') {
      return user.notifications.filter((notification: string) =>
        !['tiktok', 'whatsapp'].some(premiumPlatform =>
          notification.toLowerCase().includes(premiumPlatform)
        )
      );
    }
    return user.notifications;
  }

  toggleSubscription(user: any, type: 'free' | 'premium') {
    user.subscriptionType = type;
  }
}
