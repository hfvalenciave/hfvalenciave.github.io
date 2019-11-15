import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadMaterialModule } from './../load-material/load-material.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TimePipe } from './pipes/time/time.pipe';
import { MailComponent } from './views/mail/mail.component';

@NgModule({
    declarations: [
        TimePipe,
        MailComponent
    ],
    entryComponents: [
        MailComponent
    ],
    exports: [
        TimePipe,
        MailComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        LoadMaterialModule,
        ReactiveFormsModule
    ],
    providers: [
        TimePipe
    ]
})
export class UtilsModule { }
