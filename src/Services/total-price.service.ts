import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TotalPriceService {

  totalPrice: number = 0;
  courseList: any;
  constructor() { }

  setTotalPrice(price: number) {
    this.totalPrice = price;
  }

  getTotalPrice() {
    return this.totalPrice;
  }

  setCourseList(courseList: any) {
    this.courseList = courseList;
  }

  getCourseList() {
    return this.courseList;
  }
}
