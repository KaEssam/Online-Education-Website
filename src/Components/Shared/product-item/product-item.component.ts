import { HttpClientJsonpModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductsService } from '../../../Services/products.service';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [HttpClientJsonpModule,RouterModule],
  providers:[ProductsService],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
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
