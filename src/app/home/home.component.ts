import { Component, inject, Inject, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../services/product.service';
import { AddProduct } from '../models/SignUp';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  productsList : undefined | AddProduct[]
  trendyProdList : undefined | AddProduct[]
  productService = inject(ProductService);
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  ngOnInit(): void {
   this.productService.popularProducts().subscribe((data)=>{
    this.productsList = data;
   })
   this.productService.trendyProducts().subscribe((data) => {
    this.trendyProdList = data;
   })
  }



  
}
