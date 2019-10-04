import { isNullOrUndefined } from 'util';
import { Component, Input, OnInit } from '@angular/core';
import { Event, FirebaseDate } from './../../models/event';

@Component({
    selector: 'event-header',
    templateUrl: './event-header.component.html',
    styleUrls: ['./event-header.component.scss']
})
export class EventHeaderComponent implements OnInit {
    @Input() event: Event;

    constructor() { }

    ngOnInit() {
    }

    getDate() {
        if (isNullOrUndefined(this.event)) { return 0; }
        return (this.event.date as FirebaseDate).seconds * 1000;
    }

}
