import { NgModule } from '@angular/core';
import { MaterialModule, SharedModule } from '~/framework';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent
  ],
})
export class HomeModule { }
