import {Component, OnInit} from '@angular/core';
import {Product} from '../product';
import {UserService} from '../user.service';
import {JwtService} from '../../login/services/jwt.service';

@Component({
  selector: 'app-history-post-product',
  templateUrl: './history-post-product.component.html',
  styleUrls: ['./history-post-product.component.css']
})
export class HistoryPostProductComponent implements OnInit {
  productList: Product[];
  userName: string;
  currentPage: number;
  totalItem: number;

  constructor(private userService: UserService,
              private jwtService: JwtService) {
  }

  ngOnInit(): void {
    this.userName = this.jwtService.getUsername();
    this.userName = 'khanhquoc';
    if (this.userName === '' || this.userName === undefined || this.userName === null) {
      //  đưa ra thông báo login
      document.getElementById('control').click();
    } else {
      this.getAllProduct();
    }
  }

  getAllProduct(): void {
    this.userService.getAllProductByUName(this.userName).subscribe(
      list => {
        this.productList = list;
        this.totalItem = this.productList.length;
      },
      error => console.log(error)
    );
  }

  backToMenu(): void {
    //  trả về trang trước khi vào
  }

  postProduct(productId: number): void {
    this.userService.postProduct(productId).subscribe(
      () => {},
      e => console.log(e),
      () => this.getAllProduct()
    );
  }
}
