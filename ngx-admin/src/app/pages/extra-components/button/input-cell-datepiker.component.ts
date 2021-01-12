import { Component } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ICellEditorAngularComp } from '@ag-grid-community/angular';

@Component({
  selector: 'date-editor-cell',
  template: `<input nbInput type="date" class="form-control" placeholder="Input Date" (select)="onDateSelect($event)" />`
})
export class AgGridDatePickerComponent implements ICellEditorAngularComp {
  private params: any;

  public selectedDate: any;

  agInit(params: any): void {
    this.params = params;
  }

  getValue(): any {
    return this.selectedDate;
  }

  isPopup(): boolean {
    return true;
  }

  onDateSelect(date: NgbDate) {
    this.selectedDate = { date: { year: date.year, month: date.month + 1, day: '02' } };
    this.params.api.stopEditing();
  }
}