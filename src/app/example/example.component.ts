import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DialogConfig } from "../dialog/dialog-config";
import { DialogRef } from "../dialog/dialog-ref";
import { MatDialog } from "@angular/material/dialog";
import { PopupComponent } from "../popup/popup.component";

@Component({
  selector: "app-example",
  templateUrl: "./example.component.html",
  styleUrls: ["./example.component.css"]
})
export class ExampleComponent implements OnInit {
  public form: FormGroup;
  public dialogMsg: string;

  constructor(
    public config: DialogConfig,
    public dialog: DialogRef,
    public matDialog: MatDialog,
    public fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      firstname: [this.config.data.firstname, Validators.required],
      lastname: [this.config.data.lastname, Validators.required]
    });
    this.dialog.doneButton.subscribe(() => this.onClickDone());
  }

  onClose() {
    let formData = this.form.getRawValue();
    this.dialog.close({ ...formData, msg: this.dialogMsg });
  }

  openDialog() {
    const dialogRef = this.matDialog.open(PopupComponent, {
      role: "alertdialog",
      width: "300px",
      height: "300px"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogMsg = `Dialog result: ${result}`;
    });
  }

  onClickDone() {
    console.log("example-component: on click done");
    this.onClose();
  }
}
