import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MaterialModule, SharedModule } from '~/framework';

import { HeaderComponent } from './header/header.component';
import { SidenavMenuComponent } from './sidenav-menu/sidenav-menu.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidenavMenuComponent,
    FooterComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    MaterialModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  exports: [
    HeaderComponent,
    SidenavMenuComponent,
    FooterComponent,
    MatSidenavModule
  ]
})
export class LayoutModule { }
