import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() person: any;
  @Output() show = new EventEmitter<any>();
  @Output() delete = new EventEmitter<string>();

  onShow() {
    this.show.emit(this.person);
  }

  onDelete() {
    this.delete.emit(this.person.id);
  }
}
