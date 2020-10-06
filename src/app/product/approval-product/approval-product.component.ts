import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Status} from 'tslint/lib/runner';
import {Product} from '../product';
import {ProductService} from '../product.service';
import {Auction} from '../../auction/auction';
import {AuctionService} from '../../auction/auction.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-approval-product',
  templateUrl: './approval-product.component.html',
  styleUrls: ['./approval-product.component.css']
})
export class ApprovalProductComponent implements OnInit {
  product: Product;
  id: number;
  approvalProduct: FormGroup;
  statusList: Status[];
  auction: Auction;
  myDate = new Date();

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private auctionService: AuctionService,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit(): void {
    this.findAllStatus();
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // tslint:disable-next-line:radix
      const id = parseInt(paramMap.get('id'));
      this.productService.findById(2).subscribe(
        next => {
          this.product = next;
          this.id = this.product.productId;
          this.approvalProduct.patchValue({
            productId: this.product.productId,
            productName: this.product.productName,
            initialPrice: this.product.initialPrice,
            eachIncrease: this.product.eachIncrease,
            productDetail: this.product.productDetail,
            categoryId: this.product.categoryId,
            statusId: this.product.statusId,
            image: this.product.image,
            timeId: this.product.timeId,
            userId: this.product.userId,
          });
        }, error => {
        });
    });
    this.approvalProduct = new FormGroup({
      productId: new FormControl(''),
      productName: new FormControl(''),
      initialPrice: new FormControl(''),
      eachIncrease: new FormControl(''),
      productDetail: new FormControl(''),
      categoryId: new FormControl(''),
      statusId: new FormControl(''),
      image: new FormControl(''),
      timeId: new FormControl(''),
      userId: new FormControl(''),
    });

  }

  findAllStatus(): void {
    this.productService.findAllStatusProduct().subscribe(
      next => {
        this.statusList = next;
        console.log(this.statusList);
      }, error => {
        this.statusList = new Array();
      }
    );
  }


  onApprovalProduct(): void {
    this.product = Object.assign({}, this.approvalProduct.value);
    this.product.productId = this.id;
    this.productService.editProduct(this.product).subscribe();
    location.reload();

    // tạo phiên đấu giá sau khi duyệt
    this.auction.dayTimeStart = this.datePipe.transform(this.myDate, 'yyyy-MM-dd HH:mm:ss');
    this.auction.statusAuction = 1;
    this.auction.product = this.product.productId;
  }

}
