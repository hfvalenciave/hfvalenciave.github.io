import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './views/home/home.component';


@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        MainRoutingModule,
        ReactiveFormsModule
    ]
})
export class MainModule { }
