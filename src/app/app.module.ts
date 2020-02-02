import {LOCALE_ID, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";
import {AppRoutingModule} from "./app-routing.module";
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';

@NgModule({
  providers: [{
    provide: LOCALE_ID,
    useValue: 'pl-PL'
  }],
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    SharedModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    registerLocaleData(localePl, 'pl');
  }

}
