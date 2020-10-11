import {Component, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {Product} from '../product';
import {Category} from '../category';
import {Status} from '../status';

@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrls: ['./product-manage.component.css']
})
export class ProductManageComponent implements OnInit {
  nameProductKeySearch: '';
  posterKeySearch: '';
  arrProductNameSuggest: string[];
  isProductNameSuggest = false;
  arrPosterSuggest: string[];
  isPosterSuggest = false;
  productListApi: Product[] = [];
  productListShow: Product[] = [];
  categoryList: Category[];
  statusList: Status[];
  currentPage: number;
  totalItem: number;
  countItemSuggest = 10;
  listProductsDelete: number[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getAllProduct();
    this.productService.findAllCategoryDto().subscribe(
      list => this.categoryList = list
    );
    this.productService.findAllStatusProduct().subscribe(
      // list => this.statusList = list
    );
  }

  getAllProduct(): void {
    this.productService.getAllProduct().subscribe(
      list => {
        this.productListApi = list;
        this.totalItem = this.productListApi.length;
        this.productListShow = this.productListApi;
      },
      err => console.log('err: ' + err)
    );
  }

  suggestProductName(key: string): void {
    this.arrProductNameSuggest = [];
    if (key === undefined) {
      key = '';
    }
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.productListApi.length; i++) {
      if (this.productListApi[i].productName.toLowerCase().match(key.toLowerCase())
        && !this.arrProductNameSuggest.includes(this.productListApi[i].productName)) {
        this.arrProductNameSuggest.push(this.productListApi[i].productName);
      }
    }
  }

  suggestPoster(key: string): void {
    this.arrPosterSuggest = [];
    if (key === undefined) {
      key = '';
    }
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.productListApi.length; i++) {
      if (this.productListApi[i].fullName.toLowerCase().match(key.toLowerCase())
        && !this.arrPosterSuggest.includes(this.productListApi[i].fullName)) {
        this.arrPosterSuggest.push(this.productListApi[i].fullName);
      }
    }
  }

  isSuggest(property: string, status: boolean): void {
    if (status) {
      if (property === 'productName') {
        this.isProductNameSuggest = status;
      }
      if (property === 'poster') {
        this.isPosterSuggest = status;
      }
    } else {
      setTimeout(() => {
        if (property === 'productName') {
          this.isProductNameSuggest = status;
        }
        if (property === 'poster') {
          this.isPosterSuggest = status;
        }
      }, 150);
    }
  }

  search(): void {
    const nameProduct = document.getElementById('productName') as HTMLInputElement;
    const price = document.getElementById('price') as HTMLInputElement;
    const poster = document.getElementById('poster') as HTMLInputElement;
    const type = document.getElementById('type') as HTMLInputElement;
    const status = document.getElementById('status') as HTMLInputElement;

    this.productListShow = this.productListApi.filter(res => {
      if (res.productName.toLowerCase().match(nameProduct.value.toLowerCase())
        && res.fullName.toLowerCase().match(poster.value.toLowerCase())
        && res.categoryName.toLowerCase().match(type.value.toLowerCase())
        && res.statusName.toLowerCase().match(status.value.toLowerCase())) {
        return res;
      }
    });

    if (price.value === 'all') {
      return;
    } else if (price.value === 'price1') {
      this.productListShow = this.productListShow.filter(res => {
        if (res.initialPrice <= 100000) {
          return res;
        }
      });
    } else if (price.value === 'price2') {
      this.productListShow = this.productListShow.filter(res => {
        if (res.initialPrice > 100000 && res.initialPrice <= 1000000) {
          return res;
        }
      });
    } else if (price.value === 'price3') {
      this.productListShow = this.productListShow.filter(res => {
        if (res.initialPrice > 1000000) {
          return res;
        }
      });
    } else {
      return;
    }
  }


  findEach(key: string, property: string): void {
    if (key === undefined) {
      key = '';
    }
    if (key !== '') {
      if (property === 'productName') {
        const productNameTag = document.getElementById('productName') as HTMLInputElement;
        productNameTag.value = key;
        this.productListShow = this.productListApi.filter(res => {
          return res.productName.toLocaleLowerCase().match(key.toLocaleLowerCase());
        });
      } else if (property === 'categoryName') {
        if (key === 'Tất cả') {
          this.productListShow = this.productListApi;
        } else {
          this.productListShow = this.productListApi.filter(res => {
            return res.categoryName.toLocaleLowerCase().match(key.toLocaleLowerCase());
          });
        }
      } else if (property === 'poster') {
        const posterTag = document.getElementById('poster') as HTMLInputElement;
        posterTag.value = key;
        this.productListShow = this.productListApi.filter(res => {
          return res.fullName.toLocaleLowerCase().match(key.toLocaleLowerCase());
        });
      } else if (property === 'initialPrice') {
        if (key === 'price1') {
          this.productListShow = this.productListApi.filter(res => {
            if (res.initialPrice > 0 && res.initialPrice <= 100000) {
              return res;
            }
          });
        } else if (key === 'price2') {
          this.productListShow = this.productListApi.filter(res => {
            if (res.initialPrice > 100000 && res.initialPrice <= 1000000) {
              return res;
            }
          });
        } else if (key === 'price3') {
          this.productListShow = this.productListApi.filter(res => {
            if (res.initialPrice > 1000000) {
              return res;
            }
          });
        } else if (key === 'Tất cả') {
          this.productListShow = this.productListApi;
        }
      } else if (property === 'statusName') {
        if (key === 'Tất cả') {
          this.productListShow = this.productListApi;
        } else {
          this.productListShow = this.productListApi.filter(res => {
            return res.statusName.toLocaleLowerCase().match(key.toLocaleLowerCase());
          });
        }
      }
    } else {
      this.productListShow = this.productListApi;
    }
  }

  cancel(): void {
    this.productListShow = this.productListApi;
  }

  chooseToDelete(testId: number): void {
    if (this.listProductsDelete.includes(testId)) {
      this.listProductsDelete.splice(this.listProductsDelete.indexOf(testId), 1);
    } else {
      this.listProductsDelete.push(testId);
    }
  }

  deleteProducts(): void {
    this.productService.deleteProducts(this.listProductsDelete).subscribe(
      () => null,
      () => null,
      () => {
        this.getAllProduct();
        this.listProductsDelete = [];
      }
    );
  }
}
