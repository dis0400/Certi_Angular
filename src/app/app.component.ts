import { Component } from '@angular/core';
import { UserComponent } from './user/user.component';
import { NotificationComponent } from './notification/notification.component';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-root',
  standalone: true, // Definir el componente root como standalone
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [UserComponent, NotificationComponent] // Importar los componentes independientes
})
export class AppComponent {
  constructor(private notificationService: NotificationService) {}

  addNewNotification(network: string, message: string): void {
    const isPremium = ['tiktok', 'whatsapp'].includes(network);
    this.notificationService.addNotification(network, message, isPremium);
  }
}
