import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HomeComponent } from './home/home.component'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { TestErrorComponent } from './test-error/test-error.component';
import { NotFoundComponent } from './test-error/not-found/not-found.component';
import { ServerErrorComponent } from './test-error/server-error/server-error.component'
import { ErrorInterceptor } from './middleware/error.interceptor'
import { SharedModule } from './shared/shared.module'
import { CoreModule } from './core/core.module'
import { ShopModule } from './shop/shop.module'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TestErrorComponent,
    NotFoundComponent,
    ServerErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    CoreModule,
    ShopModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
