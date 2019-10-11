import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/security-utils/services/auth/auth.service';
import { isNullOrUndefined } from 'util';
import { Event, FirebaseDate } from './../../models/event';

@Component({
    selector: 'event-header',
    templateUrl: './event-header.component.html',
    styleUrls: ['./event-header.component.scss']
})
export class EventHeaderComponent implements OnInit {
    @Input() event: Event;
    logged = false;

    constructor(private autnService: AuthService) { }

    ngOnInit() {
        this.autnService.signed.subscribe(signed => this.logged = signed);
    }

    getDate() {
        if (isNullOrUndefined(this.event)) { return 0; }
        return (this.event.date as FirebaseDate).seconds * 1000;
    }

}
