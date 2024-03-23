import { Component } from '@angular/core';
import { EventItemComponent } from '../../event-item/event-item.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-event-section',
  standalone: true,
  imports: [EventItemComponent,RouterModule],
  templateUrl: './event-section.component.html',
  styleUrl: './event-section.component.css'
})
export class EventSectionComponent {

}
