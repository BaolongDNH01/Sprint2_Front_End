import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Status} from 'tslint/lib/runner';
import {Product} from '../product';
import {ProductService} from '../product.service';
import {Auction} from '../../auction/auction';
import {DatePipe} from '@angular/common';
import {AuctionService} from '../../auction/auction.service';

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
  auction: Auction = new Auction();
  myDate = new Date();

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private auctionService: AuctionService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // tslint:disable-next-line:radix
      const id = parseInt(paramMap.get('id'));
      this.productService.findById(id).subscribe(
        next => {
          this.product = next;
          console.log(this.product);
          this.id = this.product.productId;
          this.approvalProduct = new FormGroup({
            productId: new FormControl(this.product.productId),
            productName: new FormControl(this.product.productName),
            datePost: new FormControl(this.product.datePost),
            initialPrice: new FormControl(this.product.initialPrice),
            eachIncrease: new FormControl(this.product.eachIncrease),
            productDetail: new FormControl(this.product.productDetail),
            categoryId: new FormControl(this.product.categoryId),
            statusId: new FormControl(2),
            timeId: new FormControl(this.product.timeId),
            userId: new FormControl(this.product.userId),
          });
        }, error => {
        });
    });
  }

  onApprovalProduct(): void {
    this.product = Object.assign({}, this.approvalProduct.value);
    this.product.productId = this.id;
    this.productService.editProduct(this.product).subscribe(
      next => {

      }, error => {

      }, () => {
      }
    );
    // tạo auction khi duyệt
    this.auction.dayTimeStart = this.datePipe.transform(this.myDate, 'yyyy-MM-dd HH:mm:ss');
    this.auction.statusId = 1;
    this.auction.productId = this.product.productId;
    this.auctionService.save(this.auction).subscribe();
    // location.reload();
  }

  noApprovalProduct(): void {
  }
}
