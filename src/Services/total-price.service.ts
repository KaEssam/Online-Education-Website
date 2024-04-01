import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TotalPriceService {
  private _totalPrice = new BehaviorSubject<number>(0);
  readonly totalPrice$ = this._totalPrice.asObservable();
  private _courseList = new BehaviorSubject<number[]>([]);
  readonly courseList$ = this._courseList.asObservable();

  constructor() {}

  setTotalPrice(price: number) {
    this._totalPrice.next(price);
  }

  setCourseList(courseList: any) {
    this._courseList.next(Object.assign([], courseList));
  }
}
