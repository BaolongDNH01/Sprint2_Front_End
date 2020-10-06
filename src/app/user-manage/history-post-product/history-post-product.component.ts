import { Component, OnInit } from '@angular/core';
import {Product} from '../product';
import {UserService} from '../user.service';

@Component({
  selector: 'app-history-post-product',
  templateUrl: './history-post-product.component.html',
  styleUrls: ['./history-post-product.component.css']
})
export class HistoryPostProductComponent implements OnInit {
  productList: Product[];
  userName = 'khanhne';
  currentPage: number;
  totalItem: number;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct(): void{
    this.userService.getAllProductByUName(this.userName).subscribe(
      list => {
        this.productList = list;
        this.totalItem = this.productList.length;
      },
      error => console.log(error)
    );
  }
}
