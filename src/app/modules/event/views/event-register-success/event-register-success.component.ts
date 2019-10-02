import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { Event, FirebaseDate } from './../../models/event';
import { EventRegister } from './../../models/event-register';
import { EventRegisterService } from './../../services/event-register/event-register.service';
import { EventService } from './../../services/event/event.service';

@Component({
    selector: 'app-event-register-success',
    templateUrl: './event-register-success.component.html',
    styleUrls: ['./event-register-success.component.scss']
})
export class EventRegisterSuccessComponent implements OnInit {
    currentEvent: Event;
    currentRegister: any;

    constructor(private activatedRoute: ActivatedRoute,
                private eventService: EventService,
                private registerService: EventRegisterService) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            if (!isNullOrUndefined(params.id)) {
                this.eventService.getById(params.id).subscribe(event => this.currentEvent = event);
                this.registerService.getById(params.id, params.registerId).subscribe(register => {
                    this.currentRegister = register;
                });
            }
        });
    }

    getDate() {
        if (isNullOrUndefined(this.currentEvent)) { return 0; }
        return (this.currentEvent.date as FirebaseDate).seconds * 1000;
    }

}
