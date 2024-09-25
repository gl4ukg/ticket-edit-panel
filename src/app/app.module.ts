import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InlineEditComponent } from './components/inline-edit/inline-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SubtaskListComponent } from './components/subtask-list/subtask-list.component';
import { TicketEditPanelComponent } from './ticket-edit-panel/ticket-edit-panel.component';
import { SvgIconComponent } from './svg-icon/svg-icon.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    InlineEditComponent,
    SubtaskListComponent,
    TicketEditPanelComponent,
    SvgIconComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
