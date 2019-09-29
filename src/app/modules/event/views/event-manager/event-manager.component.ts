import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { EventService } from '../../services/event.service';
import { Event } from './../../models/event';
import { Router } from '@angular/router';

@Component({
    selector: 'app-event-manager',
    templateUrl: './event-manager.component.html',
    styleUrls: ['./event-manager.component.scss']
})
export class EventManagerComponent implements OnInit {
    displayedColumns: string[] = ['type', 'name', 'date', 'actions'];
    dataSource: MatTableDataSource<Event>;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    constructor(private eventService: EventService, private router: Router) { }

    ngOnInit() {
        this.eventService.all().subscribe(list => {
            this.dataSource = new MatTableDataSource<Event>(list);
            this.dataSource.paginator = this.paginator;
        });
    }

    show(event: Event) {
        console.log(event);
        this.router.navigate(['/event', event._id]);
    }

    edit(element: Event) {
        console.log(element);
        this.router.navigate(['/event', element._id, 'edit']);
    }
}
