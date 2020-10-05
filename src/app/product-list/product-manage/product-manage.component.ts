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
  productListShow: Product[] = [];
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
        this.productListShow = this.productList;
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

  findSuggest(key: string, property: string): void {
    this.arrProductSuggest = [];
    if (property === 'productName') {
      for (let i = 0; i < this.productList.length; i++) {
        if (this.productList[i].productName.toLowerCase().match(key.toLowerCase())) {
          this.arrProductSuggest.push(this.productList[i].productName);
        }
      }
    } else if (property === 'poster') {
      for (let i = 0; i < this.productList.length; i++) {
        if (this.productList[i].poster.toLowerCase().match(key.toLowerCase())) {
          this.arrProductSuggest.push(this.productList[i].poster);
        }
      }
    }else{
      console.log('sai thuoc tinh');
    }
  }

  findEach(key: string, property: string): void {
    if (key === undefined) {
      key = '';
    }
    if (key !== '') {
      if (property === 'productName') {
        this.productListShow = this.productList.filter(res => {
          return res.productName.toLocaleLowerCase().match(key.toLocaleLowerCase());
        });
      } else if (property === 'categoryName') {
        if (key === 'Tất cả') {
          this.productListShow = this.productList;
        } else {
          this.productListShow = this.productList.filter(res => {
            return res.categoryName.toLocaleLowerCase().match(key.toLocaleLowerCase());
          });
        }
      } else if (property === 'poster') {
        this.productListShow = this.productList.filter(res => {
          return res.poster.toLocaleLowerCase().match(key.toLocaleLowerCase());
        });
      } else if (property === 'initialPrice') {
        if (key === 'price1') {
          this.productListShow = this.productList.filter(res => {
            if (res.initialPrice > 0 && res.initialPrice <= 100000) {
              return res;
            }
          });
        } else if (key === 'price2') {
          this.productListShow = this.productList.filter(res => {
            if (res.initialPrice > 100000 && res.initialPrice <= 1000000) {
              return res;
            }
          });
        } else if (key === 'price3') {
          this.productListShow = this.productList.filter(res => {
            if (res.initialPrice > 1000000) {
              return res;
            }
          });
        } else if (key === 'Tất cả') {
          this.productListShow = this.productList;
        }
      } else if (property === 'statusName') {
        if (key === 'Tất cả') {
          this.productListShow = this.productList;
        } else {
          this.productListShow = this.productList.filter(res => {
            return res.statusName.toLocaleLowerCase().match(key.toLocaleLowerCase());
          });
        }
      }
    }
  }
}
