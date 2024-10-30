import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { filter, from, map, tap } from 'rxjs';
import { data, socialNetworks } from './data';
import { CardComponent } from './card/card.component';

export interface User {
  user_id: string;
  name: string;
  age: number;
  status: string;
  amountAvailable: number;
  subscriptionType: string;
  subscriptions: number[];
  notifications: string[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, CardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-tour-of-heroes';
  socialNetworks = socialNetworks;
  users: User[] = Object.values(data);

  socialNetworksTypes = [
    { platform: 'youtube', type: 'video', platformType: 'free' },
    { platform: 'facebook', type: 'story', platformType: 'free' },
    { platform: 'tiktok', type: 'video', platformType: 'premium' },
    { platform: 'instagram', type: 'story', platformType: 'free' },
    { platform: 'whatsapp', type: 'message', platformType: 'premium' },
  ];

  sendNotification(platform: string) {
    const message = `${platform} added a new ${this.getPlatformType(platform)}`;
    const platformId = this.getPlatformId(platform);
    const isPremium = this.isPlatformPremium(platform);

    from(this.users)
      .pipe(
        filter((user) => user.status === 'active'),
        filter((user) => user.subscriptions.includes(platformId)),
        map((user) => {
          if (!isPremium) {
            user.notifications.push(message);
          }
          if (
            isPremium &&
            user.amountAvailable >= 5 &&
            user.subscriptionType === 'premium'
          ) {
            user.amountAvailable -= 5;
            user.notifications.push(message);
          }
          return user;
        }),
        tap((user) =>
          console.log(`Notification added to ${user.name}: ${message}`)
        )
      )
      .subscribe();
  }

  private getPlatformType(platform: string): string {
    const network = this.socialNetworks.find((n) => n.platform === platform);
    return network ? network.type : 'content';
  }

  private getPlatformId(platform: string): number {
    const platforms = [
      'youtube',
      'facebook',
      'tiktok',
      'instagram',
      'whatsapp',
    ];
    return platforms.indexOf(platform) + 1;
  }

  private isPlatformPremium(platform: string): boolean {
    const network = this.socialNetworks.find((n) => n.platform === platform);
    return network ? network.platformType === 'premium' : false;
  }
}