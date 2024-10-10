import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, SearchComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() person: any;
  @Input() type: 'personal' | 'geographic' | 'messages' = 'personal';
  
  filteredMessages: string[] = [];

  ngOnInit() {
    if (this.type === 'messages') {
      this.filteredMessages = this.person.messages;
    }
  }
  ngOnChanges() {
    if (this.type === 'messages' && this.person) {
      this.filteredMessages = this.person.messages;
    }
  }

  filterMessages(query: string) {
    this.filteredMessages = this.person.messages.filter((msg: string) =>
      msg.toLowerCase().includes(query.toLowerCase())
    );
  }

  get score(): number | null {
    if (this.person.type === 'student') {
      return (
        (this.person.firstTestScore + this.person.secondTestScore + this.person.finalTestScore) / 3
      );
    }
    return null;
  }
}

