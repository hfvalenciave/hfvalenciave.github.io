import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { XlsxService } from './../../../utils/services/xlsx/xlsx.service';
import { Event, FirebaseDate } from './../../models/event';
import { EventRegister } from './../../models/event-register';
import { EventRegisterService } from './../../services/event-register/event-register.service';
import { EventService } from './../../services/event/event.service';

@Component({
    selector: 'app-event-attendance',
    templateUrl: './event-attendance.component.html',
    styleUrls: ['./event-attendance.component.scss'],
    providers: [DatePipe]
})
export class EventAttendanceComponent implements OnInit {
    form: FormGroup;
    event: Event;
    totalRegistered: number;
    totalAttendees: number;
    dataSource: MatTableDataSource<EventRegister>;
    displayedColumns: string[] = ['position', 'firstName', 'lastName', 'email', 'gender', 'actions'];
    showEmailButton = false;

    paginator: MatPaginator;
    @ViewChild(MatPaginator, { static: true }) set content(content: MatPaginator) {
        this.paginator = content;
    }

    constructor(
        formBuilder: FormBuilder,
        private activateRoute: ActivatedRoute,
        private datePipe: DatePipe,
        private eventService: EventService,
        private eventRegisterService: EventRegisterService,
        private excelService: XlsxService,
        private router: Router) {

        this.form = formBuilder.group({
            criteria: [''],
            searchField: ['email']
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

        this.activateRoute.queryParams.subscribe(params => {
            if (!isNullOrUndefined(params.showEmailButton)) {
                this.showEmailButton = params.showEmailButton;
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
        let observable;
        switch (this.form.controls.searchField.value) {
            case 'email':
                observable = this.eventRegisterService.getByEventAndEmail(this.event._id, value);
                break;
            case 'firstName':
                observable = this.eventRegisterService.getByEventAndFirstName(this.event._id, value);
                break;
            case 'lastName':
                observable = this.eventRegisterService.getByEventAndLasttName(this.event._id, value);
                break;
        }

        observable.subscribe(attendees => {
            this.dataSource = new MatTableDataSource<EventRegister>(attendees);
            this.dataSource.paginator = this.paginator;
        });
    }

    goto(element: Event, page?: string) {
        const commands = ['/event', element._id];
        if (!isNullOrUndefined(page)) {
            commands.push(page);
        }

        this.router.navigate(commands);
    }

    get searchField() {
        switch (this.form.controls.searchField.value) {
            case 'email':
                return 'email';
                break;
            case 'firstName':
                return 'nombre';
                break;
            case 'lastName':
                return 'apellido';
                break;
        }

    }

    exportAsXLSX(): void {
        const data = this.dataSource.data.map(attendant => {
            const date = (attendant.birthdate as FirebaseDate).seconds * 1000;
            const formattedDate = this.datePipe.transform(date, 'dd/MM/yyyy');
            delete(attendant.birthdate);
            return {
                Nombre: attendant.firstName,
                Apellido: attendant.lastName,
                Correo: attendant.email,
                gender: attendant.gender,
                Experticia: attendant.sector,
                Ocupacion: attendant.position,
                Fecha : formattedDate,
                Ciudad: attendant.city,
                Asistio: attendant.confirmed ? 'Si' : 'No'
            };
        });
        console.log(data);
        this.excelService.exportAsExcelFile(data, 'sample');
    }
}
