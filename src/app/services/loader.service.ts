import { Injectable } from '@angular/core';
import { ReplaySubject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private _show$ = new BehaviorSubject(false);
  private show$ = this._show$.asObservable();

  constructor() { }

  public show() {
    this._show$.next(true);
  }
  public hide() {
    this._show$.next(false);
  }

  public listen(){
    return this.show$;
  }
}
