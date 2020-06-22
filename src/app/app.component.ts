import { Component, OnInit } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { Filter } from './model/filter.model';
import { FilterCollection } from './model/filter-collection.model';
import { FilterCollectionService } from './data/dao/impl/filter-collection.service';
import { FilterCollectionSearchValues } from './data/dao/search/SearchObjects';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DialogAction } from './object/DialogResult';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  filters: Filter[] = [];
  filterCollections: FilterCollection[] = [];

  filterCollectionSearchValues = new FilterCollectionSearchValues();

  constructor(
    public matDialog: MatDialog,
    private filterCollectionService: FilterCollectionService
  ) { }
  ngOnInit(): void {
    this.updateFilters();
  }

  openModal(filterCollection: FilterCollection) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "600px";
    dialogConfig.width = "800px";

    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
    modalDialog.componentInstance.filterCollection = filterCollection ? filterCollection : new FilterCollection();

    modalDialog.afterClosed().subscribe(() => {

      this.filterCollections = [];

      this.filterCollectionService.findFilterCollections(this.filterCollectionSearchValues).subscribe(result => {
        result.forEach(item => {
          let filterCollection = new FilterCollection();
          filterCollection.id = item.id;
          filterCollection.title = item.title;
          if (item.filters) {
            try {
              filterCollection.filters = JSON.parse(item.filters.toString());
            } catch (er) {
              console.log(item.title);
            }
          }
          this.filterCollections.push(filterCollection);
        });
      })
    }
    );
  }

  updateFilters() {
    this.filterCollectionService.getAll().subscribe(result => {
      result.forEach(item => {
        let filterCollection = new FilterCollection();
        filterCollection.id = item.id;
        filterCollection.title = item.title;
        if (item.filters) {
          try {
            filterCollection.filters = JSON.parse(item.filters.toString());
          } catch (er) {
            console.log(item.title);
          }
        }
        this.filterCollections.push(filterCollection);
      });
    });
  }


openDeleteDialog(filterCollection: FilterCollection) {
  const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
    maxWidth: '500px',
    data: { dialogTitle: 'Confirm', message: `Do you really want to delete: "${filterCollection.title}"?` },
    autoFocus: false
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result.action != DialogAction.OK) {
      return;
    } else {
      this.filterCollectionService.delete(filterCollection.id).subscribe(() => {
        this.filterCollectionService.findFilterCollections(this.filterCollectionSearchValues).subscribe(result => {
          this.filterCollections = result;
        });
      });

    }
  });
}  
}
