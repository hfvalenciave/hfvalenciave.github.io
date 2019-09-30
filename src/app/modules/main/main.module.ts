import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './views/home/home.component';
import { LoadMaterialModule } from '../load-material/load-material.module';


@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        LoadMaterialModule,
        MainRoutingModule,
        ReactiveFormsModule
    ]
})
export class MainModule { }
