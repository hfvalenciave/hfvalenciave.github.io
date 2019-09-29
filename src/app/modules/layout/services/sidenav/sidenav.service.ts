import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SidenavService {
    private opened$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor() { }

    get opened() { return this.opened$; }

    toggle() {
        this.opened$.next(!this.opened$.getValue());
    }
}
