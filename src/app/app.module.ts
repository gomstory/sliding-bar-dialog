import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { DialogModule } from "./dialog/dialog.module";
import { ExampleComponent } from "./example/example.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PopupComponent } from "./popup/popup.component";
import { FormComponent } from "./form/form.component";
import { AddressFormComponent } from "./form/form.component";
import { MatTabsModule } from "@angular/material/tabs";

@NgModule({
  declarations: [
    AppComponent,
    ExampleComponent,
    PopupComponent,
    FormComponent,
    AddressFormComponent
  ],
  imports: [
    BrowserModule,
    DialogModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTabsModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [ExampleComponent, PopupComponent, FormComponent]
})
export class AppModule {}
