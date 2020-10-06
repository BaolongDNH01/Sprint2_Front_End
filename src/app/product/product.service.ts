import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from './product';
import {Status} from 'tslint/lib/runner';
import {Category} from './category';
import {AuctionTime} from './auction-time';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  product: Product;
  status: Status;
  API_URL = 'http://localhost:8080';
  private getAllProductApi = 'http://localhost:8080/getAllProduct';

  constructor(private httpClient: HttpClient) {
  }

  getAllProduct(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.getAllProductApi);
  }

  findById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this.API_URL + '/product/' + id);
  }

  editProduct(product: Product): Observable<void> {
    return this.httpClient.patch<void>(this.API_URL + '/product-edit/' + product.productId, product);
    console.log('toi roi');
  }

  findAllStatusProduct(): Observable<Status[]> {
    return this.httpClient.get<Status[]>(this.API_URL + '/list-status');
  }

  findAllCategory(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.API_URL + '/list-category');
  }

  findAllAuctionTime(): Observable<AuctionTime[]> {
    return this.httpClient.get<AuctionTime[]>(this.API_URL + '/list-time');
  }
}
