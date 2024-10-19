import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ItemComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() people: any[] = [];
  @Output() show = new EventEmitter<any>();
  @Output() delete = new EventEmitter<string>();

  onShow(person: any) {
    this.show.emit(person);
  }

  onDelete(id: string) {
    this.delete.emit(id);
  }
}
