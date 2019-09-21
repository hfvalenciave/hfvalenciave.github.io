import { ContactService } from './../../services/contact/contact.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    form: FormGroup;

    constructor(formBuilder: FormBuilder, private contactService: ContactService) {
        this.form = formBuilder.group({
            email: ['', [Validators.email, Validators.required]]
        });
    }

    ngOnInit() {
    }

    submit() {
        if (this.form.valid) {
            this.disableForm();
            this.contactService.save(this.form.value)
                .subscribe(value => {
                    this.form.reset();
                    this.enableForm();
                });
        }
    }

    disableForm() {
        this.form.disable();
    }

    enableForm() {
        this.form.enable();
    }
}
