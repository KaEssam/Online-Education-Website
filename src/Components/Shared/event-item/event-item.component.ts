import { Component } from '@angular/core';
import { EventsService } from '../../../Services/events.service';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-event-item',
  standalone: true,
  imports: [RouterModule,HttpClientModule],
  providers:[EventsService],
  templateUrl: './event-item.component.html',
  styleUrl: './event-item.component.css'
})
export class EventItemComponent {
  Events: any = [];
  constructor(private eventsService: EventsService, private router: Router) { }

  ngOnInit(): void {
    this.eventsService.getAllEvents().subscribe({
      next: (data) => {
        this.Events = data;
      },
      error: (err) => {
        this.router.navigate(['/Error', { errorMessage: err.message as string }]);
      }
    })
  }
}
