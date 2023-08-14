import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { LoginModule } from './modules/login/login.module';
import { CoreModule } from './modules/core/core.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlightModule } from './modules/flight/flight.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    LoginModule,
    CoreModule,
    CommonModule,
    FlightModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
