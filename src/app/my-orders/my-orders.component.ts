import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../models/SignUp';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit {

  productService = inject(ProductService)
  orderData : order[] | undefined

  ngOnInit(): void {
    this.productService.orderList().subscribe((results)=> {
      this.orderData = results;
    })
  }

}
