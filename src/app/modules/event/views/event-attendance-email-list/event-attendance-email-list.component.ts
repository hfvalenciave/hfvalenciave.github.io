import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { Event } from './../../models/event';
import { EventRegisterService } from './../../services/event-register/event-register.service';
import { EventService } from './../../services/event/event.service';

@Component({
    selector: 'app-event-attendance-email-list',
    templateUrl: './event-attendance-email-list.component.html',
    styleUrls: ['./event-attendance-email-list.component.scss']
})
export class EventAttendanceEmailListComponent implements OnInit {
    event: Event;
    emailList: string[];

    constructor(
        private activateRoute: ActivatedRoute,
        private eventService: EventService,
        private eventRegisterService: EventRegisterService
    ) { }

    ngOnInit() {
        this.activateRoute.params.subscribe(params => {
            if (!isNullOrUndefined(params.id)) {
                this.eventService.getById(params.id).subscribe(event => {
                    this.event = event;
                    if (event) {
                        this.eventRegisterService.getRegisteredEmail(this.event._id).subscribe(emails => this.emailList = emails);
                    }
                });
            }
        });
    }

    toLowercase() {
        const subscription = this.eventRegisterService.getByEvent(this.event._id).subscribe(attendees => {
            attendees.forEach(attendant => {
                this.eventRegisterService.update(this.event._id, attendant._id, attendant);
            });
            subscription.unsubscribe();
        });
    }

}
