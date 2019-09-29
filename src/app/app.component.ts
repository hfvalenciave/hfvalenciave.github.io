import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './modules/security-utils/services/auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    signed: boolean;
    title = 'H/F Valencia';

    constructor(private auth: AuthService, private router: Router) { }

    ngOnInit() {
        this.auth.signed.subscribe(value => this.signed = value);
    }

    logout() {
        this.auth.logout().subscribe(() => this.router.navigate(['/']));
    }
}
