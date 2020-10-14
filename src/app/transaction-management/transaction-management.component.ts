import {Component, OnInit} from '@angular/core';
import {CartItemService} from '../payment/services/cart-item.service';
import {CartItem} from '../payment/models/cart-item';
import {AuctionService} from '../auction/auction.service';
import {Bidder} from '../auction/bidder';
import {CartService} from '../payment/services/cart.service';
import {Cart} from '../payment/models/cart';
import {UserService} from '../user/user.service';
import {User} from '../user/User';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {JwtService} from '../login/services/jwt.service';

@Component({
  selector: 'app-transaction-management',
  templateUrl: './transaction-management.component.html',
  styleUrls: ['./transaction-management.component.css']
})
export class TransactionManagementComponent implements OnInit {
  cartItemList: CartItem[];
  cartItemListAPI: CartItem[];
  listBidder: Bidder[];
  listCartByUser: Cart;
  listCart = [];
  listCartItemDelete: number [] = [];
  user: User;
  listUser = [];
  keyWordUserPoster: string;
  keyWordUserBuy: string;
  keyWordProductName: string;
  keyWordTotalPrice: string;
  keyWordStatus: string;
  roles: string[];

  constructor(
    private cartItemService: CartItemService,
    private auctionService: AuctionService,
    private cartService: CartService,
    private userService: UserService,
    private jwt: JwtService,
    private router: Router
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

  ngOnInit(): void {
    this.cartItemService.getAllCartItem().subscribe(
      list => {
        this.cartItemList = list;
        for (let i = 0; i < this.cartItemList.length; i++) {
          this.cartItemList[i].auctionId;
          this.auctionService.findBidderByAuctionId(this.cartItemList[i].auctionId).subscribe(
            listBidder => {
              this.listBidder = listBidder;
              for (let j = 0; j < this.listBidder.length; j++) {
                this.cartItemList[i].bidPrice = this.listBidder[j].bidPrice;
                this.cartItemList[i].bidDateTime = this.listBidder[j].bidDateTime;
                this.userService.findUserById(this.listBidder[j].userId).subscribe(
                  listUser => {
                    this.listUser.push(listUser);
                    for (let k = 0; k < this.listUser.length; k++) {
                      this.cartItemList[i].userIdBuy = this.listUser[k].userId;
                      this.cartItemList[i].userNameBuy = this.listUser[k].username;
                    }
                  }
                );
              }
            }, error => {
            },
            () => {
              this.cartService.getCartByUserId(this.cartItemList[i].userId).subscribe(
                listCartByUser => {
                  this.listCartByUser = listCartByUser;
                  console.log(this.listCartByUser);
                  this.listCart.push(this.listCartByUser);
                  for (let k = 0; k < this.listCart.length; k++) {
                    this.cartItemList[i].shipCost = this.listCart[k].shipCost;
                    console.log(this.cartItemList[i].shipCost);
                    this.cartItemList[i].currentTotalPrice = this.listCart[k].currentTotalPrice;
                    this.cartItemList[i].cartStatus = this.listCart[k].cartStatus;
                  }
                }
              );
            }
          );
        }
      }, error => {
      }, () => {
        this.cartItemListAPI = this.cartItemList;
      });
  }

  search(): void {
    this.cartItemList = this.cartItemListAPI.filter(res => {
      return res.userName.match(this.keyWordUserPoster) &&
        res.userNameBuy.match(this.keyWordUserBuy) &&
        res.productName.match(this.keyWordProductName) &&
        res.cartStatus.toString().match(this.keyWordStatus) &&
        res.currentTotalPrice.toString().match(this.keyWordTotalPrice);
    });
  }

  chooseToDelete(cartItemId: number): void {
    if (this.listCartItemDelete.includes(cartItemId)) {
      this.listCartItemDelete.splice(this.listCartItemDelete.indexOf(cartItemId), 1);
    } else {
      this.listCartItemDelete.push(cartItemId);
    }
  }

  deleteCartItem(): void {
    this.cartItemService.deleteCartItem(this.listCartItemDelete).subscribe(
      next => {

      }, error => {

      }, () => {
        location.reload();
      }
    );
  }


}
