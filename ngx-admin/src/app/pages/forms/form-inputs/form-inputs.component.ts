import { Component, OnInit, ViewChild } from "@angular/core";
import { GridOptions } from "ag-grid-community";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { BtnCellRenderer } from "../../extra-components/button/btn-cell-renderer.component";
import { BtnCellPrinter } from "../../extra-components/button/btn-cell-print.component";
import { BtnCellRemove } from "../../extra-components/button/btn-cell-remove.component";
import { AgGridDatePickerComponent } from "../../extra-components/button/input-cell-datepiker.component";

import {
  NbComponentStatus,
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrConfig,
  NbToastrService,
} from "@nebular/theme";

@Component({
  selector: "ngx-form-inputs",
  //template: ``,
  styleUrls: ["./form-inputs.component.scss"],
  templateUrl: "./form-inputs.component.html",
})
export class FormInputsComponent implements OnInit {
  public starRate = 2;
  public heartRate = 4;
  public radioGroupValue = "This is value 2";
  public title = "new ng grid add";

  public gridApi;
  public gridColumnApi;
  public rowData;
  public columnDefs;
  public defaultColDef;
  public pinnedTopRowData;
  public pinnedBottomRowData;
  public gridOptions: GridOptions;
  public components;
  frameworkComponents: {
    btnCellRenderer: typeof BtnCellRenderer;
    btnCellPrinter: typeof BtnCellPrinter;
    btnCellRemove: typeof BtnCellRemove;
    agGridDatePickerComponent: typeof AgGridDatePickerComponent;
  };
  paginationPageSize: number;
  autoGroupColumnDef: {
    headerName: string;
    minWidth: number;
    field: string;
    valueGetter: (params: any) => any;
    headerCheckboxSelection: boolean;
    cellRenderer: string;
    cellRendererParams: { checkbox: boolean };
  };
  paginationNumberFormatter: (params: any) => string;
  rowSelection: string;
  rowGroupPanelShow: string;
  pivotPanelShow: string;
  public params: any;
  public columnDefs_;
  public baseUrl: string;
  public selectedDate: { date: { year: any; month: any; day: string } };
  public selectedItem = "2";
  @ViewChild("autoInput") input;
  options: string[];
  filteredOptions$: Observable<string[]>;
  constructor(
    private http: HttpClient,
    private toastrService: NbToastrService
  ) {
    this.baseUrl = environment.baseURL;
    this.gridOptions = <GridOptions>{};
    this.create10kCities();

    this.columnDefs = [
      {
        colId: "checkbox",
        maxWidth: 50,
        checkboxSelection: true,
        suppressMenu: true,
        headerCheckboxSelection: true,
      },
      { field: "athlete", shortable: true },
      { field: "age" },
      {
        field: "country",
        rowGroup: true,
      },
      {
        field: "year",
        rowGroup: true,
      },
      { field: "date" },
      {
        field: "sport",
        rowGroup: true,
      },
      { field: "gold" },
      { field: "silver" },
      { field: "bronze" },
      { field: "total" },
      {
        field: "action",
        cellRenderer: "btnCellRenderer",
        cellRendererParams: {
          clicked: function (field: any) {
            alert(`${field} was clicked`);
          },
        },
        minWidth: 250,
      },
    ];
    this.columnDefs_ = [
      {
        colId: "checkbox",
        maxWidth: 50,
        checkboxSelection: true,
        suppressMenu: true,
        headerCheckboxSelection: true,
      },
      { field: "athlete", shortable: true },
      { field: "age" },
      {
        field: "country",
        // width: 110,
        // cellRenderer: 'countryCellRenderer',
        // cellEditor: 'agRichSelectCellEditor',
        // keyCreator: function(country) {
        //     return country.name;
        // },
        // cellEditorParams: {
        //     cellRenderer: 'countryCellRenderer',
        //     values: [
        //         { name: 'Ireland', code: 'IE' },
        //         { name: 'UK', code: 'UK' },
        //         { name: 'France', code: 'FR' }
        //     ]
        // },
        // editable: true
      },
      {
        field: "year",
        rowGroup: true,
      },
      {
        editable: false,
        field: "date",
        cellRenderer: "agGridDatePickerComponent",
        cellRendererParams: {
          clicked: function (field: any) {
            debugger;
            // this.rowData.splice(0, 0, []);
            // this.gridApi.setRowData(this.rowData);
            alert(`${field} was clicked`);
          },
        },
        minWidth: 250,
      },
      {
        field: "sport",
        rowGroup: true,
      },
      { field: "gold" },
      { field: "silver" },
      { field: "bronze" },
      { field: "total" },
      {
        field: "action",
        cellRenderer: "btnCellRemove",
        cellRendererParams: {
          clicked: function (field: any) {
            debugger;
            // this.rowData.splice(0, 0, []);
            // this.gridApi.setRowData(this.rowData);
            alert(`${field} was clicked`);
          },
        },
        minWidth: 250,
      },
    ];
    this.frameworkComponents = {
      btnCellRenderer: BtnCellRenderer,
      btnCellPrinter: BtnCellPrinter,
      btnCellRemove: BtnCellRemove,
      agGridDatePickerComponent: AgGridDatePickerComponent,
    };

    this.components = { datePicker: getDatePicker() };
    this.rowSelection = "multiple";
    this.rowGroupPanelShow = "always";
    this.pivotPanelShow = "always";
    this.paginationPageSize = 10;

    this.paginationNumberFormatter = function (params) {
      return "[" + params.value.toLocaleString() + "]";
    };
    this.autoGroupColumnDef = {
      headerName: "Group",
      minWidth: 170,
      field: "athlete",
      valueGetter: function (params) {
        if (params.node.group) {
          return params.node.key;
        } else {
          return params.data[params.colDef.field];
        }
      },
      headerCheckboxSelection: true,
      cellRenderer: "agGroupCellRenderer",
      cellRendererParams: { checkbox: true },
    };
    this.defaultColDef = {
      editable: true,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
      minWidth: 100,
    };
    this.pinnedTopRowData = getPinnedTopData();
    this.pinnedBottomRowData = getPinnedBottomData();
  }
  

  //////// DDL  ///////
  ngOnInit(): void {
    this.options = ["Option 1", "Option 2", "Option 3"];
    this.filteredOptions$ = of(this.options);
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((optionValue) =>
      optionValue.toLowerCase().includes(filterValue)
    );
  }

  getFilteredOptions(value: string): Observable<string[]> {
    return of(value).pipe(map((filterString) => this.filter(filterString)));
  }

  onChange() {
    this.filteredOptions$ = this.getFilteredOptions(
      this.input.nativeElement.value
    );
  }

  onSelectionChange($event) {
    this.filteredOptions$ = this.getFilteredOptions($event);
  }

  //////// DDL ///////

  name = "Angular";

  categories = [
    { id: 1, name: "Laravel" },
    { id: 2, name: "Codeigniter" },
    { id: 3, name: "React" },
    { id: 4, name: "PHP" },
    { id: 5, name: "Angular" },
    { id: 6, name: "Vue" },
    { id: 7, name: "JQuery", disabled: true },
    { id: 8, name: "Javascript" },
  ];

  selected = [
    { id: 5, name: "Angular" },
    { id: 6, name: "Vue" },
  ];

  getSelectedValue() {
    console.log(this.selected);
  }
  cities = [
    { id: 1, name: "Vilnius" },
    { id: 2, name: "Kaunas" },
    { id: 3, name: "Pavilnys", disabled: true },
    { id: 4, name: "Pabradė" },
    { id: 5, name: "Klaipėda" },
  ];
  cities2 = [
    { id: 1, name: "Vilnius" },
    { id: 2, name: "Kaunas" },
    { id: 3, name: "Pavilnys", disabled: true },
    { id: 4, name: "Pabradė" },
    { id: 5, name: "Klaipėda" },
  ];
  cities3 = [
    {
      id: 1,
      name: "Vilnius",
      avatar:
        "//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x",
    },
    {
      id: 2,
      name: "Kaunas",
      avatar:
        "//www.gravatar.com/avatar/ddac2aa63ce82315b513be9dc93336e5?d=retro&r=g&s=15",
    },
    {
      id: 3,
      name: "Pavilnys",
      avatar:
        "//www.gravatar.com/avatar/6acb7abf486516ab7fb0a6efa372042b?d=retro&r=g&s=15",
    },
  ];
  cities4 = [];
  users = [
    { id: "anjmao", name: "Anjmao" },
    { id: "varnas", name: "Tadeus Varnas" },
  ];
  selectedAccount = "Adam";
  accounts = [
    {
      name: "Adam",
      email: "adam@email.com",
      age: 12,
      country: "United States",
    },
    {
      name: "Samantha",
      email: "samantha@email.com",
      age: 30,
      country: "United States",
    },
    {
      name: "Amalie",
      email: "amalie@email.com",
      age: 12,
      country: "Argentina",
    },
    {
      name: "Estefanía",
      email: "estefania@email.com",
      age: 21,
      country: "Argentina",
    },
    { name: "Adrian", email: "adrian@email.com", age: 21, country: "Ecuador" },
    {
      name: "Wladimir",
      email: "wladimir@email.com",
      age: 30,
      country: "Ecuador",
    },
    {
      name: "Natasha",
      email: "natasha@email.com",
      age: 54,
      country: "Ecuador",
    },
    { name: "Nicole", email: "nicole@email.com", age: 43, country: "Colombia" },
    {
      name: "Michael",
      email: "michael@email.com",
      age: 15,
      country: "Colombia",
    },
    {
      name: "Nicolás",
      email: "nicole@email.com",
      age: 43,
      country: "Colombia",
    },
  ];

  selectedCity: any;
  selectedCityIds: string[];
  selectedCityName = "Vilnius";
  selectedCityId: number;
  selectedUserIds: number[];

  // constructor() {
  //     this.create10kCities();
  // }

  addCustomUser = (term) => ({ id: term, name: term });

  private create10kCities() {
    this.cities4 = Array.from({ length: 10000 }, (value, key) => key).map(
      (val) => ({
        id: val,
        name: `city ${val}`,
      })
    );
  }
  update() {
    alert("hi");
  }
  onOptionSelect(event: any) {
    var data = event.vlaue;
    this.params.api.stopEditing();
  }
  onDateSelect(date: any) {
    this.selectedDate = {
      date: { year: date.year, month: date.month + 1, day: "02" },
    };
    this.params.api.stopEditing();
  }
  public onPageSizeChanged(newPageSize) {
    // var value = document.getElementById('page-size');
    // this.gridApi.paginationSetPageSize(Number(value));
  }
  public onBtStopEditing() {
    this.gridApi.stopEditing();
  }

  public onBtStartEditing(key, char, pinned) {
    this.gridApi.setFocusedCell(0, "lastName", pinned);
    this.gridApi.startEditingCell({
      rowIndex: 0,
      colKey: "lastName",
      rowPinned: pinned,
      keyPress: key,
      charPress: char,
    });
  }
  public onBtStartAdd(key, char, pinned) {
    var rowData_ = {
      text: "",
      dropdown: "www",
      date: "11/11/2021",
      age: "",
      address: "",
      mood: "",
      country: "",
    };
    this.rowData.splice(0, 0, rowData_);
    this.gridApi.setRowData(this.rowData);
    //this.gridOptions.api.addItems([rowData_]);
    // this.gridOptions.api.refreshView();
    // this.gridApi.setFocusedCell(0, 'lastName', pinned);
    // this.gridApi.startEditingCell({
    //   rowIndex: 0,
    //   colKey: 'lastName',
    //   rowPinned: pinned,
    //   keyPress: key,
    //   charPress: char,
    // });
  }

  onBtNextCell() {
    this.gridApi.tabToNextCell();
  }

  onBtPreviousCell() {
    this.gridApi.tabToPreviousCell();
  }

  onBtWhich() {
    var cellDefs = this.gridApi.getEditingCells();
    if (cellDefs.length > 0) {
      var cellDef = cellDefs[0];
      console.log(
        "editing cell is: row = " +
          cellDef.rowIndex +
          ", col = " +
          cellDef.column.getId() +
          ", floating = " +
          cellDef.rowPinned
      );
    } else {
      console.log("no cells are editing");
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http.get(this.baseUrl + "olympic-winners.json").subscribe((data) => {
      debugger;
      this.rowData = data;
    });

    // this.gridApi = params.api;
    // this.gridColumnApi = params.columnApi;
  }

  //////// toster///////////

  config: NbToastrConfig;

  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = "primary";

  //title = 'HI there!';
  content = `I'm cool toaster!`;

  types: NbComponentStatus[] = [
    "primary",
    "success",
    "info",
    "warning",
    "danger",
  ];
  positions: string[] = [
    NbGlobalPhysicalPosition.TOP_RIGHT,
    NbGlobalPhysicalPosition.TOP_LEFT,
    NbGlobalPhysicalPosition.BOTTOM_LEFT,
    NbGlobalPhysicalPosition.BOTTOM_RIGHT,
    NbGlobalLogicalPosition.TOP_END,
    NbGlobalLogicalPosition.TOP_START,
    NbGlobalLogicalPosition.BOTTOM_END,
    NbGlobalLogicalPosition.BOTTOM_START,
  ];

  quotes = [
    { title: null, body: "We rock at Angular" },
    { title: null, body: "Titles are not always needed" },
    { title: null, body: "Toastr rock!" },
  ];

  makeToast() {
    this.showToast(this.status, this.title, this.content);
  }

  openRandomToast() {
    const typeIndex = Math.floor(Math.random() * this.types.length);
    const quoteIndex = Math.floor(Math.random() * this.quotes.length);
    const type = this.types[typeIndex];
    const quote = this.quotes[quoteIndex];
    this.showToast(type, quote.title, quote.body);
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `. ${title}` : "";

    this.index += 1;
    this.toastrService.show(body, `Toast ${this.index}${titleContent}`, config);
  }
  ///////////////////
}

function getPinnedTopData() {
  return [
    {
      firstName: "##",
      lastName: "##",
      gender: "##",
      address: "##",
      mood: "##",
      country: "##",
    },
  ];
}
function getPinnedBottomData() {
  return [
    {
      firstName: "##",
      lastName: "##",
      gender: "##",
      address: "##",
      mood: "##",
      country: "##",
    },
  ];
}
function getCharCodeFromEvent(event) {
  event = event || window.event;
  return typeof event.which === "undefined" ? event.keyCode : event.which;
}
function isCharNumeric(charStr) {
  return !!/\d/.test(charStr);
}
function isKeyPressedNumeric(event) {
  var charCode = getCharCodeFromEvent(event);
  var charStr = String.fromCharCode(charCode);
  return isCharNumeric(charStr);
}

function getDatePicker() {
  function Datepicker() {}
  Datepicker.prototype.init = function (params) {
    this.eInput = document.createElement("input");
    this.eInput.value = params.value;
    this.eInput.classList.add("ag-input");
    this.eInput.style.height = "500px";
    debugger;
    //$(this.eInput).datepicker({ dateFormat: 'dd/mm/yy' });
  };
  Datepicker.prototype.getGui = function () {
    return this.eInput;
  };
  Datepicker.prototype.afterGuiAttached = function () {
    this.eInput.focus();
    this.eInput.select();
  };
  Datepicker.prototype.getValue = function () {
    return this.eInput.value;
  };
  Datepicker.prototype.destroy = function () {};
  Datepicker.prototype.isPopup = function () {
    return false;
  };
  return Datepicker;
}

//   starRate = 2;
//   heartRate = 4;
//   radioGroupValue = 'This is value 2';
// }
