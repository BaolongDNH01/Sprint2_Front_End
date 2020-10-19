import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ProductService} from '../../product/product.service';
import {Category} from '../../product/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listCategory: Category[];

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private productService: ProductService,
  ) {
  }

  ngOnInit(): void {
    this.productService.findAllCategoryDto().subscribe(
      list => this.listCategory = list
    );
  }


}
