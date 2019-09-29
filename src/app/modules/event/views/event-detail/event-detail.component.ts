import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Observable } from 'rxjs';
import { Event } from '../../models/event';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  event: Observable<Event>;

  constructor(private eventService: EventService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (!isNullOrUndefined(params.id)) {
        this.event = this.eventService.getById(params.id);
        this.event.subscribe(value => console.log(value));
      }
    });
  }

}
