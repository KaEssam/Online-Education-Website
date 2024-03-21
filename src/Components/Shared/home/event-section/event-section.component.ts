import { Component } from '@angular/core';
import { EventItemComponent } from '../../event-item/event-item.component';

@Component({
  selector: 'app-event-section',
  standalone: true,
  imports: [EventItemComponent],
  templateUrl: './event-section.component.html',
  styleUrl: './event-section.component.css'
})
export class EventSectionComponent {

}
