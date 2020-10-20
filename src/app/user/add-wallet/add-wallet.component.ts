import { Component, OnInit } from '@angular/core';
import {ICreateOrderRequest, IPayPalConfig} from 'ngx-paypal';
import {JwtService} from "../../login/services/jwt.service";

@Component({
  selector: 'app-add-wallet',
  templateUrl: './add-wallet.component.html',
  styleUrls: ['./add-wallet.component.css']
})
export class AddWalletComponent implements OnInit {
  balance: number;
  constructor(private userService, private jwtService: JwtService) { }

  ngOnInit(): void {
    this.balance = Number(this.jwtService.getUserWallet());
  }

}
