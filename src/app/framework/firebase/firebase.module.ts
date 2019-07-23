import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { environment } from '../../../environments/environment';

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  exports: [
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ]
})
export class FirebaseModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FirebaseModule
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: FirebaseModule) {
    if (parentModule) {
      throw new Error('FirebaseModule already loaded. Import in root module only.');
    }
  }
}
