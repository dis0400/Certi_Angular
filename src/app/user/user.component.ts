import { Component, Input } from '@angular/core';
import { User } from '../app.component';
import { CommonModule } from '@angular/common';

export interface SocialNetwork {
  id: number;
  platform: string;
}

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  @Input() user!: User;
  disabled: boolean = false;
  availableNetworks: SocialNetwork[] = [];
  userSubscriptions: SocialNetwork[] = [];
  
  getPlatformName(id: number): string {
    const platforms = ['youtube', 'facebook', 'tiktok', 'instagram', 'tiktok'];
    return platforms[id - 1] || 'unknown';
  }


  socialNetworks: SocialNetwork[] = [
    { id: 1, platform: 'youtube' },
    { id: 2, platform: 'facebook' },
    { id: 3, platform: 'tiktok' },
    { id: 4, platform: 'instagram' },
    { id: 5, platform: 'whatsapp' }
  ];

  ngOnInit() {
    this.userSubscriptions = this.socialNetworks.filter(network =>
      this.user.subscriptions.includes(network.id)
    );
    this.availableNetworks = this.socialNetworks.filter(network =>
      !this.user.subscriptions.includes(network.id)
    );
    this.disabled = this.user.status !== 'active';
  }

  subscribe(network: SocialNetwork) {
    this.user.subscriptions.push(network.id);
    this.userSubscriptions.push(network);

    this.availableNetworks = this.availableNetworks.filter(n => n.id !== network.id);
  }

  unsubscribe(network: SocialNetwork) {
    this.user.subscriptions = this.user.subscriptions.filter(id => id !== network.id);
    this.userSubscriptions = this.userSubscriptions.filter(n => n.id !== network.id);

    this.availableNetworks.push(network);
  }

  changeSubscription(type: string) {
    this.user.subscriptionType = type;
  }

  closeAccount() {
    this.user.status = 'inactive';
    this.disabled = true;
  }
}