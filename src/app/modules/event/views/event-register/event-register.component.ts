import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { EventService } from '../../services/event/event.service';
import { Event, FirebaseDate } from './../../models/event';
import { EventRegisterService } from './../../services/event-register/event-register.service';

@Component({
    selector: 'app-event-register',
    templateUrl: './event-register.component.html',
    styleUrls: ['./event-register.component.scss']
})
export class EventRegisterComponent implements OnInit {
    currentEvent: Event;
    form: FormGroup;

    constructor(formBuilder: FormBuilder,
                private activatedRoute: ActivatedRoute,
                private eventService: EventService,
                private registerService: EventRegisterService) {
        this.form = formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            birthdate: ['', Validators.required],
            occupationArea: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            if (!isNullOrUndefined(params.id)) {
                this.eventService.getById(params.id).subscribe(event => this.currentEvent = event);
            }
        });
    }

    getDate() {
        if (isNullOrUndefined(this.currentEvent)) { return 0; }
        return (this.currentEvent.date as FirebaseDate).seconds * 1000;
    }

    submit() {
        if (this.form.valid && !isNullOrUndefined(this.currentEvent)) {
            this.registerService.save(this.currentEvent._id, this.form.value)
                .subscribe(value => console.log(value));
        }
    }
}
