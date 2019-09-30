import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimePipe } from './pipes/time/time.pipe';

@NgModule({
  declarations: [
    TimePipe
  ],
  exports: [
    TimePipe
  ],
  imports: [
    CommonModule
  ],
  providers: [
    TimePipe
  ]
})
export class UtilsModule { }
