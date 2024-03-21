import { Component } from '@angular/core';
import { ProductItemComponent } from '../../product-item/product-item.component';

@Component({
  selector: 'app-product-section',
  standalone: true,
  imports: [ProductItemComponent],
  templateUrl: './product-section.component.html',
  styleUrl: './product-section.component.css'
})
export class ProductSectionComponent {

}
