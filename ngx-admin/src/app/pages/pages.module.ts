import { NgModule } from '@angular/core';
import { NbButtonModule, NbInputModule, NbMenuModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../@theme/theme.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,  
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
  NbActionsModule,
  NbCardModule,
  NbOptionModule,
  NbSelectModule,
} from '@nebular/theme';
import { PagesComponent } from './pages.component';
import { UserComponent } from './user/user.component';

//import { DemoComponent } from './demo/demo.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    FormsModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    NbActionsModule,
    NbCardModule,
    NbSelectModule,
    NbOptionModule,
    NbButtonModule,
    NbInputModule
  ],
  declarations: [
    PagesComponent,
    UserComponent,
    //DemoComponent,
  ],
})
export class PagesModule {
}
