import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './domain/routing/app-routing.module';
import { AppComponent } from './app.component';
import { HeroesModule } from './domain/shared/modules/heroes/heroes.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './domain/components/header/header.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './domain/shared/services/utils/interceptor/interceptor.service';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeroesModule,
    //Animaciones para Angular Material
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
