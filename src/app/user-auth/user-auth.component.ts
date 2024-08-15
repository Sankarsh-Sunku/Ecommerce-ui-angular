import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddProduct, Cart, Login, signUp } from '../models/SignUp';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css',
})
export class UserAuthComponent implements OnInit {
  userService = inject(UserService);
  router = inject(Router);
  showSignUpOrLogin : boolean = false;
  authError: string = '';
  productService  = inject(ProductService)
  ngOnInit(): void {
    this.userAuthReload();
  }

  signUp(data: signUp) {
    this.userService.userSignUp(data).subscribe((result) => {
      if (result) {
        localStorage.setItem('user', JSON.stringify(result.body));
        this.router.navigate(['/']);
      }
    });
  }

  Login(data : Login) {
    this.authError = '';
    this.userService.userLogin(data)
    this.userService.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError = 'Email or Password is not correct, Please check'
      } else {
        this.localCartToRemoteCart();
      }
    })
  }

  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }

  showLoginOrSignUp() {
    this.showSignUpOrLogin = !this.showSignUpOrLogin;
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem("localCart")
    let user = localStorage.getItem("user")
    let userId = user && JSON.parse(user)[0].id
    if(data) {
      let cartDataList : AddProduct[]  = JSON.parse(data);
      cartDataList.forEach((product:AddProduct, index)=>{
        let cartData:Cart = {
          ...product,
          productId: product.id,
          userId
        }
        delete cartData.id
        setTimeout(()=>{
          this.productService.addToCart(cartData).subscribe((res)=> {
          if(res){
            console.log("Item stored in DB")
          }
          })
          if(cartDataList.length === index+1 ){
            localStorage.removeItem('localCart')
          }
        },500)
      })
    }
    
    setTimeout(()=>{
      this.productService.getCartList(userId);
    },2000)
  }

}
