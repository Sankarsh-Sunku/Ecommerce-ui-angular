import { HttpClient } from '@angular/common/http';
import { EventEmitter, inject, Injectable } from '@angular/core';
import { AddProduct, Cart, order } from '../models/SignUp';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http = inject(HttpClient);
  cartData = new EventEmitter<AddProduct[] | []>();

  productAddition(data: AddProduct) {
    return this.http.post('http://localhost:3000/products', data, {
      observe: 'response',
    });
  }

  productList() {
    return this.http.get<AddProduct[]>('http://localhost:3000/products');
  }

  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  getProduct(id: string) {
    return this.http.get<AddProduct>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(prod: AddProduct) {
    return this.http.put(`http://localhost:3000/products/${prod.id}`, prod);
  }

  popularProducts() {
    return this.http.get<AddProduct[]>(
      `http://localhost:3000/products?_limit=5`
    );
  }

  trendyProducts() {
    return this.http.get<AddProduct[]>(
      'http://localhost:3000/products?_limit=8'
    );
  }

  searchProducts(query: string) {
    return this.http.get<AddProduct[]>(
      `http://localhost:3000/products?q=${query}`
    );
  }

  localAddToCart(data: AddProduct) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      cartData.push(data);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }

  removeItemFromCart(productid: number) {
    let cartDate = localStorage.getItem('localCart');
    if (cartDate) {
      let items: AddProduct[] = JSON.parse(cartDate);
      items = items.filter((item: AddProduct) => productid !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData: Cart) {
    return this.http.post('http://localhost:3000/cart', cartData, {
      observe: 'response',
    });
  }

  getCartList(userId: number) {
    return this.http
      .get<AddProduct[]>('http://localhost:3000/cart?userId=' + userId, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }

  removeToCart(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId);
  }

  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore)[0];
    // console.log("UserId : " + userData.id)
    return this.http.get<Cart[]>('http://localhost:3000/cart?userId=' + userData.id);
  }

  orderNow(data: order) {
    return this.http.post('http://localhost:3000/orders', data);
  }

  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore)[0];
    return this.http.get<order[]>('http://localhost:3000/orders?userId=' + userData.id);
  }
  
  deleteCartItems(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId).subscribe((result) => {
      this.cartData.emit([]);
    })
  }
}
