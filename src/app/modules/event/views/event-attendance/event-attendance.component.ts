import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Event, FirebaseDate } from './../../models/event';
import { EventRegister } from './../../models/event-register';
import { EventRegisterService } from './../../services/event-register/event-register.service';
import { EventService } from './../../services/event/event.service';

@Component({
    selector: 'app-event-attendance',
    templateUrl: './event-attendance.component.html',
    styleUrls: ['./event-attendance.component.scss']
})
export class EventAttendanceComponent implements OnInit {
    form: FormGroup;
    event: Event;
    totalRegistered: number;
    totalAttendees: number;
    dataSource: MatTableDataSource<EventRegister>;
    displayedColumns: string[] = ['position', 'firstName', 'lastName', 'email', 'gender', 'actions'];

    paginator: MatPaginator;
    @ViewChild(MatPaginator, { static: true }) set content(content: MatPaginator) {
        this.paginator = content;
    }

    constructor(
        formBuilder: FormBuilder,
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
                    if (event) {
                        this.eventRegisterService.getByEvent(this.event._id).subscribe(attendees => {
                            this.dataSource = new MatTableDataSource<EventRegister>(attendees);
                            this.dataSource.paginator = this.paginator;
                        });

                        this.eventRegisterService.getTotalRegistered(this.event._id).subscribe(total => this.totalRegistered = total);
                        this.eventRegisterService.getTotalAttendees(this.event._id).subscribe(total => this.totalAttendees = total);
                    }
                });
            }
        });
    }

    getDate() {
        if (isNullOrUndefined(this.event)) { return 0; }
        return (this.event.date as FirebaseDate).seconds * 1000;
    }

    changeConfirmedStatus(element: EventRegister) {
        this.eventRegisterService.update(this.event._id, element._id, element);
    }

    filter(value: string) {
        this.eventRegisterService.getByCriteria(this.event._id, value).subscribe(attendees => {
            this.dataSource = new MatTableDataSource<EventRegister>(attendees);
            this.dataSource.paginator = this.paginator;
        });
    }
}
