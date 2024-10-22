import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface Notification {
  network: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifications: Notification[] = [];
  private notificationSubject: BehaviorSubject<Notification[]> = new BehaviorSubject(this.notifications);
  private amountAvailable: BehaviorSubject<number> = new BehaviorSubject(30); // Inicializado en 30$

  constructor() {}

  getNotifications(): Observable<Notification[]> {
    return this.notificationSubject.asObservable();
  }

  getAmountAvailable(): Observable<number> {
    return this.amountAvailable.asObservable();
  }

  addNotification(network: string, message: string, isPremium: boolean): void {
    const currentAmount = this.amountAvailable.value;
    if (isPremium && currentAmount >= 5) {
      this.amountAvailable.next(currentAmount - 5); // Descontar 5$ por notificación premium
    }

    if (!isPremium || (isPremium && currentAmount >= 5)) {
      this.notifications.push({ network, message });
      this.notificationSubject.next(this.notifications);
    }
  }
}
