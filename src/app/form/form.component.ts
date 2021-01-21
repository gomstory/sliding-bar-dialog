import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit
} from "@angular/core";
import { ControlContainer, FormBuilder, FormGroup } from "@angular/forms";
import { DialogConfig } from "../dialog/dialog-config";
import { DialogRef } from "../dialog/dialog-ref";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class FormComponent implements OnInit, AfterViewInit {
  public formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: DialogRef,
    private config: DialogConfig
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      firstname: [""],
      lastname: [""]
    });
    this.dialogRef.doneButton.subscribe(() => this.close());
  }

  ngAfterViewInit() {
    // Workaround: Patching old values need setTimeout to avoid warning msg.
    setTimeout(() => {
      this.formGroup.patchValue({ ...this.config.data });
    });
  }

  close() {
    let data = this.formGroup.getRawValue();
    this.dialogRef.close(data);
  }
}

@Component({
  selector: "address-form",
  templateUrl: "./address-form.component.html",
  styleUrls: ["./form.component.css"]
})
export class AddressFormComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private controlContainer: ControlContainer
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      house_no: [""],
      country: [""]
    });

    // Set this form to parent
    let container = this.controlContainer.control as FormGroup;
    container.addControl("address", this.formGroup);
  }
}
