import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { Event, FirebaseDate } from './../../models/event';
import { EventRegister } from './../../models/event-register';
import { EventRegisterService } from './../../services/event-register/event-register.service';
import { EventService } from './../../services/event/event.service';
import { debounce, debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-event-attendance',
    templateUrl: './event-attendance.component.html',
    styleUrls: ['./event-attendance.component.scss']
})
export class EventAttendanceComponent implements OnInit {
    form: FormGroup;
    event: Event;
    dataSource: MatTableDataSource<EventRegister>;
    displayedColumns: string[] = ['firstName', 'lastName', 'email', 'gender', 'actions'];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(formBuilder: FormBuilder,
        private activateRoute: ActivatedRoute,
        private eventService: EventService,
        private eventRegisterService: EventRegisterService,
        private router: Router) {
        this.form = formBuilder.group({
            criteria: ['']
        });

        this.form.get('criteria').valueChanges
            .pipe(debounceTime(300))
            .subscribe(value => this.filter(value));
    }

    ngOnInit() {
        this.activateRoute.params.subscribe(params => {
            if (!isNullOrUndefined(params.id)) {
                this.eventService.getById(params.id).subscribe(event => {
                    this.event = event;
                    this.eventRegisterService.getByEvent(this.event._id).subscribe(attendees => {
                        this.dataSource = new MatTableDataSource<EventRegister>(attendees);
                        this.dataSource.paginator = this.paginator;
                    });
                });
            }
        });
    }

    getDate() {
        if (isNullOrUndefined(this.event)) { return 0; }
        return (this.event.date as FirebaseDate).seconds * 1000;
    }

    confirm(element: EventRegister) {
    }

    filter(value: string) {
        console.log(value);
        this.eventRegisterService.getByCriteria(this.event._id, value).subscribe(attendees => {
            this.dataSource = new MatTableDataSource<EventRegister>(attendees);
            this.dataSource.paginator = this.paginator;
        });
    }
}
