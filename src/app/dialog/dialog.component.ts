import {
  Component,
  Type,
  ComponentFactoryResolver,
  ViewChild,
  OnDestroy,
  ComponentRef,
  AfterViewInit,
  ChangeDetectorRef
} from "@angular/core";
import { InsertionDirective } from "./insertion.directive";
import { Subject } from "rxjs";
import { DialogRef } from "./dialog-ref";
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.css"],
  animations: [
    trigger("slideInOut", [
      transition(":enter", [
        style({ transform: "translateX(100%)" }),
        animate("350ms ease-in", style({ transform: "translateX(0%)" }))
      ]),
      transition(":leave", [
        animate("350ms ease-in", style({ transform: "translateX(-100%)" }))
      ])
    ])
  ]
})
export class DialogComponent implements AfterViewInit, OnDestroy {
  private readonly _onClose = new Subject<any>();
  private readonly _onDone = new Subject<any>();

  public componentRef: ComponentRef<any>;
  public onClose = this._onClose.asObservable();
  public onDone = this._onDone.asObservable();
  public childComponentType: Type<any>;
  public fullScreen = false;

  @ViewChild(InsertionDirective) insertionPoint: InsertionDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef,
    private dialogRef: DialogRef
  ) {}

  ngAfterViewInit() {
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }

  onOverlayClicked(evt: MouseEvent) {
    this.dialogRef.close();
  }

  onDialogClicked(evt: MouseEvent) {
    evt.stopPropagation();
  }

  loadChildComponent(componentType: Type<any>) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      componentType
    );

    let viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  expand() {
    this.fullScreen = !this.fullScreen;
  }

  done() {
    this._onDone.next();
  }

  close() {
    this._onClose.next();
  }
}
