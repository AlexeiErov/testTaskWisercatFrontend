import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './modal/modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import { SelectService } from './select/select.service';
import {MatDividerModule} from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { FilterCollectionService } from './data/dao/impl/filter-collection.service';
import {MatTableModule} from '@angular/material/table';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    ConfirmDialogComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatDividerModule,
    MatTableModule
  ],
  providers: [SelectService, FilterCollectionService],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalComponent,
    ConfirmDialogComponent,
  ]
})
export class AppModule { }
