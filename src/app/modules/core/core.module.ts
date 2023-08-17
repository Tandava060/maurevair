import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    NavbarComponent,
    SpinnerComponent
  ]
})
export class CoreModule { }
