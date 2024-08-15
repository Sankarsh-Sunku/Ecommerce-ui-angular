import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { AddProduct, Cart } from '../models/SignUp';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  activateRoute = inject(ActivatedRoute);
  productService = inject(ProductService);
  productDetails : undefined | AddProduct;
  productQuantity : number = 1;
  removeCart = false
  cartData : AddProduct | undefined
  
  ngOnInit(): void {
    let productID = this.activateRoute.snapshot.paramMap.get("productId")
    productID && this.productService.getProduct(productID).subscribe((result)=>{
      this.productDetails = result;

      let cartData = localStorage.getItem("localCart")
      if(productID && cartData){
        let items = JSON.parse(cartData);
        items = items.filter((item:AddProduct)=> productID == item.id.toString())
        if(items.length){
          this.removeCart = true
        } else {
          this.removeCart = false
        }
      }

      let user = localStorage.getItem("user")
      let userId = user && JSON.parse(user)[0].id
      this.productService.getCartList(userId)
      this.productService.cartData.subscribe((result)=>{
        let item = result.filter((item:AddProduct)=> productID?.toString() == item.productId?.toString())
        if(item.length){
          this.cartData = item[0]
         this.removeCart = true 
        }
      })

    })
  }

  handleQuantity(value : string) {
    if(this.productQuantity < 20 && value === 'plus'){
      this.productQuantity+=1
    } else if(this.productQuantity > 1 && value === 'min'){
      this.productQuantity-=1
    }
  }

  addToCart() {
    if(this.productDetails){
      this.productDetails.quantity = this.productQuantity;
      if(!localStorage.getItem("user")){
       this.productService.localAddToCart(this.productDetails);
       this.removeCart = true
      } else {
        // user is logged in
        let user = localStorage.getItem("user")
        let userId = user && JSON.parse(user)[0].id
        let cartData : Cart =  {
          ...this.productDetails,
          userId,
          productId : this.productDetails.id
        }
        delete cartData.id
        this.productService.addToCart(cartData).subscribe((results)=>{
          if(results) {
            this.productService.getCartList(userId)
            this.removeCart = true
          }
        })
      }
    }
  }

  removeToCart(productId : number) {
    if(!localStorage.getItem('user')){
      this.productService.removeItemFromCart(productId);
      
    } else {
      // this.productService.removeToCart()
      let user = localStorage.getItem("user")
        let userId = user && JSON.parse(user)[0].id
      this.cartData && this.productService.removeToCart(this.cartData.id).subscribe((results)=>{
        if(results) {
          this.productService.getCartList(userId)
        }
      })
    }
    this.removeCart = false
  }
  
}
