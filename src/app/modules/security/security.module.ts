import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadMaterialModule } from './../load-material/load-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { SigninComponent } from './views/signin/signin.component';
import { SecurityUtilsModule } from '../security-utils/security-utils.module';


@NgModule({
    declarations: [SigninComponent],
    imports: [
        AngularFireAuthModule,
        CommonModule,
        FormsModule,
        LoadMaterialModule,
        ReactiveFormsModule,
        SecurityRoutingModule,
        SecurityUtilsModule
    ]
})
export class SecurityModule { }
