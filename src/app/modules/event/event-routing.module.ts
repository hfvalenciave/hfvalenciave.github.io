import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './../security-utils/services/auth/auth.guard';
import { EventAttendanceComponent } from './views/event-attendance/event-attendance.component';
import { EventDetailComponent } from './views/event-detail/event-detail.component';
import { EventFormComponent } from './views/event-form/event-form.component';
import { EventManagerComponent } from './views/event-manager/event-manager.component';
import { EventRegisterSuccessComponent } from './views/event-register-success/event-register-success.component';
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
        component: EventDetailComponent
    },
    {
        path: ':id/edit',
        component: EventFormComponent
    },
    {
        path: ':id/register',
        component: EventRegisterComponent
    },
    {
        path: ':id/register/:registerId',
        component: EventRegisterSuccessComponent
    },
    {
        path: ':id/attendance',
        component: EventAttendanceComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EventRoutingModule { }
