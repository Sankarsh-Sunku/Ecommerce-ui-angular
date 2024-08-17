import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cart, order } from '../models/SignUp';
import { ProductService } from '../services/product.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  productService = inject(ProductService);
  totalPrice: number | undefined;
  router = inject(Router);
  cartData: Cart[] | undefined;
  orderMessage: string | undefined;

  ngOnInit(): void {
    this.productService.currentCart().subscribe((result) => {
      this.cartData = result;
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + +item.price * item.quantity;
        }
      });
      this.totalPrice = price + price / 10 + 100;
    });
  }

  orderNow(data: { email: string; address: string; contact: string }) {
    let userStore = localStorage.getItem('user');
    let userId = userStore && JSON.parse(userStore)[0].id;

    if (this.totalPrice) {
      let orders: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined,
      };

      this.cartData?.forEach((item) => {
        setTimeout(() => {
          if (item.id) {
            this.productService.deleteCartItems(item.id);
          }
        }, 800);
      });

      this.productService.orderNow(orders).subscribe((result) => {
        if (result) {
          // alert("You lost Y'our Money")
          this.orderMessage = 'Oops You Lost Money';
          setTimeout(() => {
            this.orderMessage = undefined;
            this.router.navigate(['/my-orders']);
          }, 700);
        }
      });
    }
  }
}
