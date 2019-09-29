import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { SidenavService } from './modules/layout/services/sidenav/sidenav.service';
import { AuthService } from './modules/security-utils/services/auth/auth.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        trigger('openClose', [
            state('open', style({
                width: '{{ maxSize}}px'
            }), { params: { maxSize: 260 } }),
            state('closed', style({
                width: '{{ minSize }}px'
            }), { params: { minSize: 0 } }),
            transition('open => closed', [
                animate('.25s')
            ]),
            transition('closed => open', [
                animate('.25s')
            ]),
        ]),
    ]
})
export class AppComponent implements OnInit {
    signed: boolean;
    opened: boolean;
    title = 'H/F Valencia';

    @Input() maxSize = 260;
    @Input() minSize = 0;
    @Input() initialState: string;


    events = [];
    constructor(private auth: AuthService, private sidenavService: SidenavService, private router: Router) { }

    ngOnInit() {
        this.auth.signed.subscribe(value => this.signed = value);

        this.sidenavService.opened.subscribe(isOpened => {
            this.opened = isOpened;
            console.log(isOpened);
        });
    }

    logout() {
        this.auth.logout().subscribe(() => this.router.navigate(['/']));
    }

    toggleMenu() {
        this.sidenavService.toggle();
    }

    navigateTo(url: string) {
        this.router.navigateByUrl(url);
    }
}
