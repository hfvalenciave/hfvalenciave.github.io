import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from './../../services/event.service';
import { isNullOrUndefined } from 'util';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-event-form',
    templateUrl: './event-form.component.html',
    styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
    form: FormGroup;
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    @ViewChild('chipList', { static: true }) chipList;
    GradeArray: any = ['8th Grade', '9th Grade', '10th Grade', '11th Grade', '12th Grade'];
    SubjectsArray: {name: string}[] = [];
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];

    constructor(formBuilder: FormBuilder,
                private activateRoute: ActivatedRoute,
                private eventService: EventService) {
        this.form = formBuilder.group({
            _id: [''],
            type: ['meetup', Validators.required],
            name: ['', Validators.required],
            date: [Date.now(), Validators.required],
            startTime: ['00:00', Validators.required],
            endTime: ['23:59', Validators.required],
            description: ['', Validators.required],
            location: ['', Validators.required],
            image: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.activateRoute.params.subscribe(params => {
            if (!isNullOrUndefined(params.id)) {
                this.loadValues(params.id);
            }
        });
    }

    loadValues(id: string) {
        this.eventService.getById(id).subscribe(document => {
            console.log(document);
            this.form.patchValue(document);
        });
    }

    submit() {
        if (this.form.valid) {
            this.removeNullValues(this.form.value);
            this.removeEmptyValues(this.form.value);
            console.log(this.form.value);
            this.eventService.save(this.form.value);
        }
        console.log(this.form.value);
    }

    removeNullValues(obj: any) {
        Object.keys(obj).forEach(key => {
            if (isNullOrUndefined(obj[key])) {
                delete obj[key];
            }
        });
    }

    removeEmptyValues(obj: any) {
        Object.keys(obj).forEach(key => {
            if (obj[key] === '') {
                delete obj[key];
            }
        });
    }
}
