import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from './product';
import {Category} from './category';
import {AuctionTime} from './auction-time';
import {StatusProduct} from './statusProduct';
import {Image} from './image';
import {JwtService} from '../login/services/jwt.service';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  product: Product;
  status: StatusProduct;
  API_URL = 'http://localhost:8080';
  private getAllProductApi = 'http://localhost:8080/getAllProduct';

  constructor(private httpClient: HttpClient,
              private jwtService: JwtService) {
  }

  getAllProduct(): Observable<Product[]> {
    const headerAuth = new HttpHeaders();
    headerAuth.append('admin', 'Bearer' + this.jwtService.getToken());
    return this.httpClient.get<Product[]>(this.getAllProductApi);
  }

  findById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this.API_URL + '/product/' + id);
  }

  // Châu => func dùng để thay đổi status khi product được duyệt
  editProduct(product: Product): Observable<void> {
    return this.httpClient.patch<void>(this.API_URL + '/product-edit/' + product.productId, product);
  }

  findAllStatusProduct(): Observable<StatusProduct[]> {
    return this.httpClient.get<StatusProduct[]>(this.API_URL + '/list-status');
  }

  findAllCategory(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.API_URL + '/list-category');
  }

  findAllAuctionTime(): Observable<AuctionTime[]> {
    return this.httpClient.get<AuctionTime[]>(this.API_URL + '/list-time');
  }

  save(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.API_URL + '/create-product', product);
  }

  private getAllCategoryDtoApi = 'http://localhost:8080/getAllCategoryDto';
  private deleteProductsApi = 'http://localhost:8080/deleteProducts';

  findAllCategoryDto(): Observable<Category[]> {
    const headerAuth = new HttpHeaders();
    headerAuth.append('admin', 'Bearer' + this.jwtService.getToken());
    return this.httpClient.get<Category[]>(this.getAllCategoryDtoApi);
  }

  deleteProducts(list: number[]): Observable<any> {
    const headerAuth = new HttpHeaders();
    headerAuth.append('admin', 'Bearer' + this.jwtService.getToken());
    return this.httpClient.post<any>(this.deleteProductsApi, list);
  }

  saveImg(image: Image): Observable<Image> {
    return this.httpClient.post<Image>(this.API_URL + '/create-image', image);
  }

  getListImg(id: number): Observable<Image[]> {
    return this.httpClient.get<Image[]>(this.API_URL + '/get-image-product/' + id);
  }

  deleteImg(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.API_URL + '/delete-image/' + id);
  }
  adminEdit(product: Product): Observable<any>{
    return this.httpClient.post<any>(this.API_URL + '/admin-edit', product);
  }
}
