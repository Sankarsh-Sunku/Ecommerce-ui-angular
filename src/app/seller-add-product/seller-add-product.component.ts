import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { AddProduct } from '../models/SignUp';

@Component({
  selector: 'app-seller-add-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css',
})
export class SellerAddProductComponent implements OnInit {
  productService = inject(ProductService);
  addProductMessage: string | undefined;

  ngOnInit(): void {}

  productAddition(data: AddProduct): void {
    this.productService.productAddition(data).subscribe((result) => {
      console.warn(result);
      if (result) {
        this.addProductMessage =
          'The product has been successfully added in to the database';
      }
      setTimeout(() => (this.addProductMessage = undefined), 3000);
    });
  }
}
