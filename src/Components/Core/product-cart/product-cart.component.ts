import { HttpClientModule } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import AOS from 'aos'; //AOS - 1
import { ProductsService } from '../../../Services/products.service';

@Component({
  selector: 'app-product-cart',
  standalone: true,
  imports: [RouterModule, HttpClientModule],
  providers: [ProductsService],
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.css'
})
export class ProductCartComponent {

  id: any;
  product: any;

  constructor(private productService: ProductsService, private router: Router, private Activated: ActivatedRoute) {
    this.id = this.Activated.snapshot.params["id"];
  }

  ngOnInit(): void {
    AOS.init();
    AOS.refresh();

    this.productService.getProductById(this.id).subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (err) => {
        this.router.navigate(['/Error', { errorMessage: err.message as string }]);
      }
    })
  }


  counter = signal(1);
  plus() {
    this.counter.update(num => ++num);
  }
  minus() {
    this.counter.update(num => num > 0 ? --num : num);

  }
}



