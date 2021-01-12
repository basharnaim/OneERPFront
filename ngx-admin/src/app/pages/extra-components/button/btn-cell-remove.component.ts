import { Component, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import {
  ICellRendererParams,
  IAfterGuiAttachedParams,
} from '@ag-grid-community/all-modules';
@Component({
  selector: 'btn-cell-print',
  template: `<button class="btn btn-warning btn-sm ml-2"
  (click)="btnClickedRemove($event)"> <i class="fa fa trash"> </i> Remove </button>`,
})
export class BtnCellRemove implements ICellRendererAngularComp, OnDestroy {
  refresh(params: ICellRendererParams): boolean {
    throw new Error('Method not implemented.');
  }
  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    //throw new Error("Method not implemented.");
  }
  private params: any;

  agInit(params: any): void {
    this.params = params;
  }

  btnClickedRemove(event) {    
    this.params.clicked(event.currentTarget.innerText);
  }

  ngOnDestroy() {
    // no need to remove the button click handler
    // https://stackoverflow.com/questions/49083993/does-angular-automatically-remove-template-event-listeners
  }
}
