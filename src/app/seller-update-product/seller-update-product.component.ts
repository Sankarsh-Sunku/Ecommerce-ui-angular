import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { AddProduct } from '../models/SignUp';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css',
})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined | AddProduct;
  route = inject(ActivatedRoute);
  router = inject(Router)
  updateProductMessage: string | undefined;
  product = inject(ProductService);

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    productId &&
      this.product.getProduct(productId).subscribe((res) => {
        console.warn(res);
        this.productData = res;
      });
  }

  productUpdation(data: AddProduct) {
    if(this.productData) {
      data.id = this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result) => {
      if (result) {
        this.updateProductMessage = 'Product has been updated';
      }
    });

    setTimeout(() => {
      this.updateProductMessage = undefined;
      this.router.navigate(['seller-home']);
    }, 3000);
  }
}
