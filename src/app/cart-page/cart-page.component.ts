import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Cart, PriceSummary } from '../models/SignUp';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit{

  cartData : undefined | Cart[];
  priceSummary : PriceSummary = {
    price:0,
    tax:0,
    delivery:0,
    total:0
  
  }
  productService = inject(ProductService)
  router = inject(Router)

  ngOnInit(): void {
    this.productService.currentCart().subscribe((result) => {
      this.cartData = result;
      let price  = 0;
      result.forEach((item) => {
        if(item.quantity){
          price = price + (+item.price * item.quantity ) 
        }
      })
      this.priceSummary.price = price;
      this.priceSummary.tax = price/10
      this.priceSummary.delivery=100
      this.priceSummary.total = price + (price/10) + 100
    })
  }

  checkout() {
    this.router.navigate(["/checkout"])
  }
}
