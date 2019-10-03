import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { EventService } from '../../services/event/event.service';
import { Event } from './../../models/event';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';

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

    goto(element: Event, page?: string) {
        const commands = ['/event', element._id];
        if (!isNullOrUndefined(page)) {
            commands.push(page);
        }
        this.router.navigate(commands);
    }
}
