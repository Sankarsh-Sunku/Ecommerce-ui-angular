import { Component, inject, OnInit } from '@angular/core';
import { AddProduct } from '../models/SignUp';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  resultOfSearch: undefined | AddProduct[];
  productService = inject(ProductService)
  activeRoute = inject(ActivatedRoute);
  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    query && this.productService.searchProducts(query).subscribe((res)=>{
      this.resultOfSearch = res;
    })
  }



}
