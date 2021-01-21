import { Component } from "@angular/core";
import { DialogService } from "./dialog/dialog.service";
import { ExampleComponent } from "./example/example.component";
import { FormComponent } from "./form/form.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public data: any = {};
  public dataForm: any = {};

  constructor(public slidingService: DialogService) {}

  openDialog() {
    const ref = this.slidingService.open(ExampleComponent, {
      data: { ...this.data }
    });

    ref.afterClosed.subscribe(result => {
      this.data = { ...result };
    });
  }

  openForm() {
    const ref = this.slidingService.open(FormComponent, {
      data: { ...this.dataForm }
    });

    ref.afterClosed.subscribe(result => {
      this.dataForm = { ...result };
    });
  }
}
