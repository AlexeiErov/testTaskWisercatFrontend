import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import { Type } from '../selectors/type';
import { Comparator } from '../selectors/comparator';
import { SelectService } from '../select/select.service';
import { Filter} from '../model/filter.model';
import { FilterCollection } from '../model/filter-collection.model';
import { FilterCollectionService } from '../data/dao/impl/filter-collection.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {


  selectedType: Type = new Type(1, 'Number');
  types: Type[];
  comparators: Comparator[];

  @Input()
  filterCollection: FilterCollection;
  dataarray = [];

  saveSuccess = false;

  constructor(private dialogRef: MatDialogRef<ModalComponent>,
              private selectService: SelectService,
              private filterCollectionService: FilterCollectionService
              ) { }

  ngOnInit(): void {
    this.comparators = this.selectService.getComparators();
    this.types = this.selectService.getTypes();
    if (!this.filterCollection.id) {
      this.filterCollection.filters.push(new Filter());
    }
  }

  onSelectType(typeId: number) {
    return this.comparators.filter((item) => 
      item.typeId === typeId);
      
  }  

  onSubmit() {
    if (this.filterCollection.id) {
      this.filterCollectionService.update(this.filterCollection).subscribe(() => this.toggleSuccess());
    } else {
      this.filterCollectionService.add(this.filterCollection).subscribe(result => {
        this.filterCollection.id = result.id;
        this.filterCollection.title = result.title;
        this.filterCollection.filters = JSON.parse(result.filters.toString());
        this.toggleSuccess();
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  addForm() {
    this.filterCollection.filters.push(new Filter());
  }

  removeForm(index) {
    this.filterCollection.filters.splice(index, 1);
  }

  toggleSuccess() {
    this.saveSuccess = true;
    setTimeout(() => this.saveSuccess = false, 3000);
  }
}
