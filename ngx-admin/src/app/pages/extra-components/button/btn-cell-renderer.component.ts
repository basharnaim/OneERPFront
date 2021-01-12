import { Component, OnDestroy } from "@angular/core";
import { ICellRendererAngularComp } from "@ag-grid-community/angular";
import {
  ICellRendererParams,
  IAfterGuiAttachedParams,
} from "@ag-grid-community/all-modules";
@Component({
  selector: "btn-cell-renderer",
  template: `<button
      class="btn btn-success btn-sm ml-2"
      (click)="btnClickedHandler($event)"
    >
    <i class="fa fa-edit" > </i>
      Edit
    </button>
    <button
      class="btn btn-danger  btn-sm ml-2"
      (click)="btnClickedHandler($event)"
    >
    <i class="fa fa-printer" > </i>
      Print
    </button>`,
})
export class BtnCellRenderer implements ICellRendererAngularComp, OnDestroy {
  refresh(params: ICellRendererParams): boolean {
    return false;
  }
  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    
  }
  private params: any;

  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler(event) {
    this.params.clicked(event.currentTarget.innerText);
    //this.params.clicked(this.params.value);
  }

  btnClickedPrinter(event) {
    this.params.clicked(event.currentTarget.innerText);
    //this.params.clicked(this.params.value);
  }

  ngOnDestroy() {
    // no need to remove the button click handler
    // https://stackoverflow.com/questions/49083993/does-angular-automatically-remove-template-event-listeners
  }
}
