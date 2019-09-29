import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventDetailComponent } from './views/event-detail/event-detail.component';
import { EventFormComponent } from './views/event-form/event-form.component';
import { EventManagerComponent } from './views/event-manager/event-manager.component';


const routes: Routes = [
  {
    path: '',
    component: EventManagerComponent
  },
  {
    path: 'new',
    component: EventFormComponent
  },
  {
    path: ':id',
    component: EventDetailComponent
  },
  {
    path: ':id/edit',
    component: EventFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
