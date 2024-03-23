import { Component } from '@angular/core';
import { ProductItemComponent } from '../../product-item/product-item.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-section',
  standalone: true,
  imports: [ProductItemComponent,RouterModule],
  templateUrl: './product-section.component.html',
  styleUrl: './product-section.component.css'
})
export class ProductSectionComponent {

}
