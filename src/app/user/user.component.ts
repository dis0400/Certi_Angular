import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../notification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  standalone: true, // Esto hace que el componente sea independiente
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  imports: [CommonModule] // Si necesitas más módulos, los importas aquí
})
export class UserComponent {
  subscriptionType: 'Free' | 'Premium' = 'Free';
  amountAvailable$: Observable<number>;
  networks = ['youtube', 'facebook', 'tiktok', 'whatsapp'];
  subscribedNetworks = ['youtube', 'facebook'];

  constructor(private notificationService: NotificationService) {
    this.amountAvailable$ = this.notificationService.getAmountAvailable();
  }

  toggleSubscription(type: 'Free' | 'Premium'): void {
    this.subscriptionType = type;
  }

  isPremiumNetwork(network: string): boolean {
    return ['tiktok', 'whatsapp'].includes(network);
  }

  canSubscribeToNetwork(network: string): boolean {
    return (
      this.subscriptionType === 'Premium' || !this.isPremiumNetwork(network)
    );
  }
  unsubscribe(network: string): void {
    this.subscribedNetworks = this.subscribedNetworks.filter(n => n !== network);
  }
  
}
