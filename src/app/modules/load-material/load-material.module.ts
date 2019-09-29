import { NgModule } from '@angular/core';
import { MatButtonModule, MatChipsModule, MatDatepickerModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatSelectModule, MatToolbarModule, MatTableModule, MatPaginatorModule, MatCardModule } from '@angular/material';
import { AmazingTimePickerModule } from 'amazing-time-picker';



@NgModule({
  declarations: [],
  exports: [
    AmazingTimePickerModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule
  ],
  imports: [
    AmazingTimePickerModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule
  ]
})
export class LoadMaterialModule { }
