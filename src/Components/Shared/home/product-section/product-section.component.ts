import { Component } from '@angular/core';
import { ProductItemComponent } from '../../product-item/product-item.component';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from '../../../../Services/products.service';

@Component({
  selector: 'app-product-section',
  standalone: true,
  imports: [ProductItemComponent,RouterModule,HttpClientModule],
  providers:[ProductsService],
  templateUrl: './product-section.component.html',
  styleUrl: './product-section.component.css'
})
export class ProductSectionComponent {
  Products:any = [];
  constructor(private productsService:ProductsService , private router:Router){ }

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe({
      next:(data)=>{
        this.Products = data;
      },
      error:(err)=>{
        this.router.navigate(['/Error',{errorMessage : err.message as string}]);
      }
    })
  }
}
