import { AuthService } from './../../../security-utils/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    logged = false;
    sending = false;

    constructor(formBuilder: FormBuilder,
                private activatedRoute: ActivatedRoute,
                private authService: AuthService,
                private eventService: EventService,
                private registerService: EventRegisterService,
                private router: Router) {
        this.form = formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            city: ['', Validators.required],
            birthdate: ['', Validators.required],
            gender: ['', Validators.required],
            sector: ['', Validators.required],
            position: ['', Validators.required],
            confirmed: [false]
        });
    }

    ngOnInit() {
        this.authService.signed.subscribe(signed => {
            this.logged = signed;
            this.form.controls.confirmed.setValue(this.logged);
        });
        this.activatedRoute.params.subscribe(params => {
            if (!isNullOrUndefined(params.id)) {
                this.eventService.getById(params.id).subscribe(event => {
                    this.currentEvent = event;
                    if (this.currentEvent.registerDisabled) {
                        this.form.disable();
                    } else {
                        this.form.enable();
                    }

                    if (this.logged) {
                        this.form.enable();
                    }
                });
            }
        });
    }

    getDate() {
        if (isNullOrUndefined(this.currentEvent)) { return 0; }
        return (this.currentEvent.date as FirebaseDate).seconds * 1000;
    }

    submit() {
        if (this.form.valid && !isNullOrUndefined(this.currentEvent)) {
            this.sending = true;
            this.form.disable();
            this.registerService.save(this.currentEvent._id, this.form.value)
                .subscribe(value => {
                    console.log(value);
                    this.sending = false;
                    this.form.reset({confirmed: this.logged});
                    this.form.enable();
                    Object.keys(this.form.controls).forEach(key => {
                        this.form.controls[key].setErrors(null);
                    });

                    if (!this.logged) {
                        this.router.navigate(['/event', this.currentEvent._id, 'register', value.id]);
                    }
                });
        }
    }
}
