import { Component } from '@angular/core';
import { EventItemComponent } from '../../event-item/event-item.component';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { EventsService } from '../../../../Services/events.service';

@Component({
  selector: 'app-event-section',
  standalone: true,
  imports: [EventItemComponent,RouterModule,HttpClientModule],
  providers:[EventsService],
  templateUrl: './event-section.component.html',
  styleUrl: './event-section.component.css'
})
export class EventSectionComponent {
  Events: any = [];
  displayedEvents: any[] = [];
  constructor(private eventsService: EventsService, private router: Router) { }

  ngOnInit(): void {
    this.eventsService.getAllEvents().subscribe({
      next: (data) => {
        this.Events = data;
        this.displayedEvents = this.Events.slice(0, 4);
      },
      error: (err) => {
        this.router.navigate(['/Error', { errorMessage: err.message as string }]);
      }
    })
  }
}
