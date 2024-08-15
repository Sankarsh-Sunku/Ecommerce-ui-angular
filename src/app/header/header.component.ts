import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { AddProduct } from '../models/SignUp';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  router = inject(Router);
  menuTyoe : string = 'default'
  sellerName : string = ''
  productService  = inject(ProductService)
  searchResult : undefined |AddProduct[];
  userName : string = ""
  cartItems = 0;
  ngOnInit(): void {
    this.router.events.subscribe((value:any)=>{
      if(value.url){
        //console.warn(value.url)
        if(localStorage.getItem("seller") && value.url.includes("seller")){
          //console.warn("in seller area")
          this.menuTyoe = "seller"
          let sellerStore = localStorage.getItem("seller")
          let sellerData = sellerStore && JSON.parse(sellerStore)[0]
          this.sellerName = sellerData.name;
        } else if(localStorage.getItem("user")) {
          let user = localStorage.getItem("user");
          let userData = user && JSON.parse(user)[0];
          this.userName = userData.name;
          this.menuTyoe = "user";
          this.productService.getCartList(userData.id)
        } else {
          //console.warn("outside seller")
          this.menuTyoe = 'default'
        }
      }
    })

    let cartData = localStorage.getItem("localCart");
    this.cartItems =  cartData && JSON.parse(cartData).length


    this.productService.cartData.subscribe((items)=>{
      this.cartItems = items.length;
    })
  }

  logout(){
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }


  
searchProduct(query: KeyboardEvent) {
  if(query){
    const element = query.target as HTMLInputElement;
    // //console.warn()
    this.productService.searchProducts(element.value).subscribe((result) => {
      // console.warn(result)
      if(result.length > 5) {
        result.length = 5;
      }
      this.searchResult = result;
    })

  }
}

hideSearch() {
  this.searchResult = undefined
}

submitSearch(query : string) {
  this.router.navigate([`search/${query}`])
}

redirectToDetails(id:number) {
  this.router.navigate([`/details/${id}`])
}

userLogout() {
  localStorage.removeItem("user");
  this.router.navigate(['/user-auth'])
}

}
