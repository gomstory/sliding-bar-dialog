import { Observable, Subject } from "rxjs";

export class DialogRef {
  private readonly _afterClosed = new Subject<any>();
  private readonly _onDoneBtnClicked = new Subject<any>();

  public afterClosed: Observable<any> = this._afterClosed.asObservable();
  public doneButton: Observable<any> = this._onDoneBtnClicked.asObservable();

  close(result?: any) {
    this._afterClosed.next(result);
  }

  done() {
    this._onDoneBtnClicked.next();
  }
}
