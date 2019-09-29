import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../../security-utils/services/auth/auth.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
    form: FormGroup;

    constructor(formBuilder: FormBuilder,
                private authService: AuthService,
                private router: Router) {
        this.form = formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    ngOnInit() {
    }

    submit() {
        if (this.form.valid) {
            this.form.disable();
            const { email, password } = this.form.value;
            this.authService.login(email, password).subscribe(value => {
                this.form.enable();
                this.router.navigate(['/admin']);
            });
        }
    }
}
