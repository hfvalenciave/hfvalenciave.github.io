import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { Event } from '../../models/event';
import { EventService } from '../../services/event/event.service';
import { FirebaseDate } from './../../models/event';

@Component({
    selector: 'app-event-detail',
    templateUrl: './event-detail.component.html',
    styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
    event: Event;

    constructor(private eventService: EventService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (!isNullOrUndefined(params.id)) {
                this.eventService.getById(params.id).subscribe(event => this.event = event);
            }
        });
    }

    getDate() {
        if (isNullOrUndefined(this.event)) { return 0; }
        return (this.event.date as FirebaseDate).seconds * 1000;
    }

}
