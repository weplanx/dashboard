import { registerLocaleData } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpClientXsrfModule,
  provideHttpClient,
  withFetch
} from '@angular/common/http';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { NZ_CONFIG, NzConfig } from 'ng-zorro-antd/core/config';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';

import { AppComponent } from './app.component';
import { AppInterceptors } from './app.interceptors';

registerLocaleData(en);

const routes: Routes = [];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientXsrfModule,
    FormsModule,
    RouterModule.forRoot(routes, { useHash: true, initialNavigation: 'enabledBlocking' })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptors, multi: true },
    { provide: NZ_I18N, useValue: en_US },
    provideHttpClient(withFetch()),
    {
      provide: NZ_CONFIG,
      useValue: <NzConfig>{
        notification: { nzPlacement: 'bottomRight' },
        table: { nzSize: 'small' }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
