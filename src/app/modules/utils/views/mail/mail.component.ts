import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-mail',
    templateUrl: './mail.component.html',
    styleUrls: ['./mail.component.scss']
})

export class MailComponent implements OnInit {
    form: FormGroup;

    constructor(formBuilder: FormBuilder,
                public dialogRef: MatDialogRef<MailComponent>,
                @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
        this.form = formBuilder.group({
            message: ['', Validators.required]
        });
    }

    ngOnInit() {
    }

    submit() {
        if (this.form.valid) {
            this.data.message = this.form.controls.message.value;
            return this.data;
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
