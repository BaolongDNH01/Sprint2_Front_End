import {Component, OnInit} from '@angular/core';
import {Auction} from '../auction';
import {AuctionService} from '../auction.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Product} from '../../product/product';
import {Router} from '@angular/router';
import {StatusProduct} from '../../product/statusProduct';
import {JwtService} from '../../login/services/jwt.service';
import {ProductService} from '../../product/product.service';
import {UserService} from '../../user/user.service';
import {loggedIn} from '@angular/fire/auth-guard';

@Component({
  selector: 'app-list-auction',
  templateUrl: './list-auction.component.html',
  styleUrls: ['./list-auction.component.css']
})
export class ListAuctionComponent implements OnInit {
  auctionList: Auction[];
  auctionList1: Auction[] = [];
  auctionListShow: Auction[] = [];
  status = new StatusProduct();
  timeoutAuction: FormGroup;
  product: Product;
  auction: Auction;
  id: number;
  statusList: StatusProduct[];
  statusNameDr = 'Tất cả các phiên';
  numberCount = 1;
  curpage = 1;
  public now: Date = new Date();
  roles: string[];
  point: number;

  constructor(
    private auctionService: AuctionService,
    private router: Router,
    private jwt: JwtService,
    private productService: ProductService,
    private userService: UserService
  ) {
    this.roles = jwt.getAuthorities();
    if (this.roles.length === 0) {
      router.navigateByUrl('**');
    }
    this.roles.every(role => {
      if (role === 'ROLE_MEMBER') {
        router.navigateByUrl('**');
        return;
      }
    });
  }

  getTimeNow(): void {
    setInterval(() => {
      this.now = new Date();
    }, 1);
  }

  ngOnInit(): void {
    this.listProductAuction();
  }

  listProductAuction(): void {
    this.auctionService.findAllProductAuction().subscribe(
      list => {
        this.auctionList = list;
        console.log(this.auctionList);
        this.auctionListShow = this.auctionList;
      }, error => {
      },
      () => {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.auctionList.length; i++) {
          this.auctionList[i].no = this.numberCount++;
        }
        this.auctionService.getAllStatusAuction().subscribe(
          list => {
            this.statusList = list;
          }
        );
      }
    );
  }

  findProductByAuction(id: number): void {
    this.auctionService.findById(id).subscribe(
      next => {
        this.auction = next;
        this.id = this.auction.auctionId;
        this.timeoutAuction = new FormGroup({
          auctionId: new FormControl(this.auction.auctionId),
          dayTimeStart: new FormControl(this.now),
          dayTimeEnd: new FormControl(this.auction.dayTimeEnd),
          productId: new FormControl(this.auction.productId),
          statusId: new FormControl(2),
        });

      }, error => {
      }, () => {
        this.onEditStatusAuction();
      });
  }

  onStatusAuction(auctionId: number): void {
    this.findProductByAuction(auctionId);
    this.auctionService.findById(auctionId).subscribe(
      next => {
        console.log(next);
        this.productService.findById(next.productId).subscribe(
          listProduct => {
            this.userService.findUserById(listProduct.userId).subscribe(
              userById => {
                console.log(userById.point);
                this.point = 5;
                console.log(this.point);
                this.userService.increasePoint(userById, this.point).subscribe(
                  check => {
                  }
                );
              }
            );
          }
        );
      }
    );
  }


  onChangeStatusAuctionWithStatusFinish(auctionId: number): void {
    this.findProductByAuctionInStatusFinish(auctionId);
    this.auctionService.findById(auctionId).subscribe(
      next => {
        console.log(next);
      }
    );
  }

  findProductByAuctionInStatusFinish(id: number): void {
    this.auctionService.findById(id).subscribe(
      next => {
        this.auction = next;
        this.id = this.auction.auctionId;
        this.timeoutAuction = new FormGroup({
          auctionId: new FormControl(this.auction.auctionId),
          dayTimeStart: new FormControl(this.now),
          dayTimeEnd: new FormControl(this.auction.dayTimeEnd),
          productId: new FormControl(this.auction.productId),
          statusId: new FormControl(1),
        });

      }, error => {
      }, () => {
        this.onEditStatusAuctionWithStatusFinish();
      });
  }

  onEditStatusAuctionWithStatusFinish(): void {
    this.getTimeNow();
    this.auction = Object.assign({}, this.timeoutAuction.value);
    this.auction.auctionId = this.id;
    this.auctionService.editAuction(this.auction).subscribe(
      next => {
      }, error => {

      }, () => {

      }
    );
    location.reload();
  }


  onEditStatusAuction(): void {
    this.getTimeNow();
    this.auction = Object.assign({}, this.timeoutAuction.value);
    this.auction.auctionId = this.id;
    this.auctionService.editAuction(this.auction).subscribe(
      next => {
      }, error => {

      }, () => {

      }
    );
    this.router.navigateByUrl('');
  }

  find(statusName: string): void {
    this.auctionListShow = [];
    this.statusNameDr = statusName;
    console.log(this.auctionList);
    this.auctionList.forEach(q => {
      if (q.statusName === statusName) {
        this.auctionListShow.push(q);
      }
    });
  }
}
