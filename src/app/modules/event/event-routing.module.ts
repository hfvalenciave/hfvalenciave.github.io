import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './../security-utils/services/auth/auth.guard';
import { EventDetailComponent } from './views/event-detail/event-detail.component';
import { EventFormComponent } from './views/event-form/event-form.component';
import { EventManagerComponent } from './views/event-manager/event-manager.component';
import { EventRegisterComponent } from './views/event-register/event-register.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: EventManagerComponent
  },
  {
    path: 'new',
    canActivate: [AuthGuard],
    component: EventFormComponent
  },
  {
    path: ':id',
    canActivate: [AuthGuard],
    component: EventDetailComponent
  },
  {
    path: ':id/edit',
    component: EventFormComponent
  },
  {
    path: ':id/register',
    component: EventRegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
