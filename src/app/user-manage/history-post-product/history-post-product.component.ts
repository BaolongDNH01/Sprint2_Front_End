import {Component, OnInit} from '@angular/core';
import {Product} from '../product';
import {UserService} from '../user.service';
import {JwtService} from '../../login/services/jwt.service';
import {Router} from '@angular/router';

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
              private jwtService: JwtService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userName = this.jwtService.getUsername();
    this.getAllProduct();
    console.log('sjkdfhvierusgoiuv');
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
     this.router.navigateByUrl('approval-product/' + productId).then();
  }
}
