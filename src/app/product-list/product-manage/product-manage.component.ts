import {Component, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {Product} from '../product';

@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrls: ['./product-manage.component.css']
})
export class ProductManageComponent implements OnInit {
  nameProductKeySearch: '';
  posterKeySearch: '';
  suggestions: boolean;
  arrProductSuggest: string[];
  productList: Product[] = [];
  currentPage: number;
  totalItem: number;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct(): void {
    this.productService.getAllProduct().subscribe(
      list => {
        this.productList = list;
        this.totalItem = this.productList.length;
      },
      err => console.log('err: ' + err)
    );
  }

  search(arr: string[]): void {

  }

  searchAuto(key: string): void {

  }

  hasSuggest(sg: boolean): void {
    this.suggestions = sg;
    this.arrProductSuggest = [];
  }

  findSuggest(key: string): void {
    this.arrProductSuggest = [];
    if (key === undefined) {
      key = '';
    }
    if (key !== '') {
      const a = Math.random() * 10;
      for (let i = 0; i < a; i++) {
        this.arrProductSuggest.push('khanh nè');
      }
    }
  }
}
