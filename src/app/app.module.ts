import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AutoCompleteModule } from 'primeng/autocomplete';

import { AppComponent } from './app.component';
import { MarkedPipe } from './marked.pipe';

@NgModule({
  imports: [BrowserModule, NoopAnimationsModule, FormsModule, AutoCompleteModule],
  declarations: [AppComponent, MarkedPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
