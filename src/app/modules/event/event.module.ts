import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadMaterialModule } from '../load-material/load-material.module';
import { EventRoutingModule } from './event-routing.module';
import { EventFormComponent } from './views/event-form/event-form.component';
import { EventManagerComponent } from './views/event-manager/event-manager.component';
import { EventDetailComponent } from './views/event-detail/event-detail.component';
import { EventRegisterComponent } from './views/event-register/event-register.component';

@NgModule({
  declarations: [EventManagerComponent, EventFormComponent, EventDetailComponent, EventRegisterComponent],
  imports: [
    CommonModule,
    EventRoutingModule,
    FormsModule,
    LoadMaterialModule,
    ReactiveFormsModule
  ]
})
export class EventModule { }
