import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { AddProduct } from '../models/SignUp';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent implements OnInit{

  icon = faTrash;
  edit = faEdit;
  
  productService = inject(ProductService);
  productMessage : string | undefined;
  lst : undefined | AddProduct[];
  ngOnInit(): void {
    this.productList()
  }

  deleteProduct(id:number) {
    this.productService.deleteProduct(id).subscribe((result)=>{
      if(result) {
        this.productMessage = "Product Is Deleted"

        this.productList()

      }
    })

    setTimeout(()=>{
      this.productMessage = undefined
    }, 3000)
  }


  productList() {
    this.productService.productList().subscribe((result)=>{
      console.warn(result)
      this.lst = result;  
    });

  }

}
