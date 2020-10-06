import { Component, OnInit } from '@angular/core';
import {Product} from '../product';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Category} from '../category';
import {AuctionTime} from '../auction-time';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product;
  productForm: FormGroup;
  categoryList: Category[];
  auctionTimeList: AuctionTime[];

  constructor(private fb: FormBuilder, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required]],
      initialPrice: ['', [Validators.required, Validators.pattern(/\d+/)]],
      eachIncrease: ['', [Validators.required, Validators.pattern(/\d+/)]],
      productDetail: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      statusId: ['', [Validators.required]],
      timeId: ['', [Validators.required]],
      userId: ['', [Validators.required]],
    });
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    //   // this.khachHang = Object.assign({}, this.khachHangForm.value);
    //   // this.khachhangService.save(this.khachHang).subscribe(
    //   //   next => {
    //   //     console.log('Create process!');
    //   //   }, error => {
    //   //     console.log('Create failed!');
    //   //   }
    //   // );
    //   // this.router.navigateByUrl('');
  }

  findAllCategory(): void {
    this.productService.findAllCategory().subscribe(
      next => {
        this.categoryList = next;
        console.log(this.categoryList);
      }, error => {
        this.categoryList = new Array();
      }
    );
  }

  findAllAuctionTime(): void {
    this.productService.findAllAuctionTime().subscribe(
      next => {
        this.auctionTimeList = next;
        console.log(this.auctionTimeList);
      }, error => {
        this.auctionTimeList = new Array();
      }
    );
  }

}
