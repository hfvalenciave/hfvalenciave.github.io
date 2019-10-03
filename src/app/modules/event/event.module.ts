import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadMaterialModule } from '../load-material/load-material.module';
import { UtilsModule } from './../utils/utils.module';
import { EventRoutingModule } from './event-routing.module';
import { EventDetailComponent } from './views/event-detail/event-detail.component';
import { EventFormComponent } from './views/event-form/event-form.component';
import { EventManagerComponent } from './views/event-manager/event-manager.component';
import { EventRegisterSuccessComponent } from './views/event-register-success/event-register-success.component';
import { EventRegisterComponent } from './views/event-register/event-register.component';
import { EventAttendanceComponent } from './views/event-attendance/event-attendance.component';

@NgModule({
  declarations: [
    EventManagerComponent,
    EventFormComponent,
    EventDetailComponent,
    EventRegisterComponent,
    EventRegisterSuccessComponent,
    EventAttendanceComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    FormsModule,
    LoadMaterialModule,
    ReactiveFormsModule,
    UtilsModule
  ]
})
export class EventModule { }
