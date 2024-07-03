import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChildformComponent } from './components/componentForm/childform/childform.component';
import { ParentComponent } from './components/componentForm/parent/parent.component';
import {ReactiveFormsModule} from "@angular/forms";
import { AccessorDirective, FirstTestValidatorDirective } from './directive/accessor.directive';

@NgModule({
  declarations: [
    AppComponent,
    ChildformComponent,
    ParentComponent,
    AccessorDirective,
    FirstTestValidatorDirective

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
