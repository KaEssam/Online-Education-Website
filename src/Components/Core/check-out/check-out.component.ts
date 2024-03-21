import {Component } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-check-out',
  standalone: true,
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
  exportAs: 'checkOut'
})
export class CheckOutComponent {
 activeTab: string = 'credit-card'; 

  constructor() {}

  switchTab(tabName: string): void {
    this.activeTab = tabName;
  }
}

