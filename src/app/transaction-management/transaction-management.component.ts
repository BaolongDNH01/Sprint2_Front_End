import {Component, OnInit} from '@angular/core';
import {CartItemService} from '../payment/services/cart-item.service';
import {CartItem} from '../payment/models/cart-item';
import {AuctionService} from '../auction/auction.service';
import {Bidder} from '../auction/bidder';
import {CartService} from '../payment/services/cart.service';
import {Cart} from '../payment/models/cart';
import {UserService} from '../user/user.service';
import {User} from '../user/User';

@Component({
  selector: 'app-transaction-management',
  templateUrl: './transaction-management.component.html',
  styleUrls: ['./transaction-management.component.css']
})
export class TransactionManagementComponent implements OnInit {
  cartItemList: CartItem[];
  listBidder: Bidder[];
  listCartByUser: Cart;
  listCart = [];
  user: User;
  listUser = [];

  constructor(
    private cartItemService: CartItemService,
    private auctionService: AuctionService,
    private cartService: CartService,
    private userService: UserService
  ) {
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
                  console.log('toi');
                  for (let k = 0; k < this.listCart.length; k++) {
                    console.log('vo ko');
                    this.cartItemList[i].shipCost = this.listCart[k].shipCost;
                    console.log(this.cartItemList[i].shipCost);
                    this.cartItemList[i].totalPrice = this.listCart[k].totalPrice;
                    this.cartItemList[i].statusCart = this.listCart[k].status;
                  }
                }
              );
            }
          );
        }
      });
  }

}
