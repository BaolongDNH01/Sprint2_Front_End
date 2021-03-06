import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Bidder} from './bidder';
import {Auction} from './auction';
import {Product} from '../product/product';
import {StatusProduct} from '../product/statusProduct';
import {JwtService} from '../login/services/jwt.service';


@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  URL = 'http://localhost:8080';

  constructor(private httpClient: HttpClient,
              private jwtService: JwtService) {
  }

  findBidderByAuctionId(auctionId: number): Observable<any> {
    return this.httpClient.get<Bidder>(`${this.URL}/get-bidder-auction/${auctionId}`);
  }

  // Châu => hàm lấy về tất cả product trong auction
  findAllProductAuction(): Observable<Auction[]> {
    return this.httpClient.get<Auction[]>(this.URL + '/getAllAuction');
  }

  // Châu => func lấy product trong auction theo id
  findById(id: number): Observable<Auction> {
    return this.httpClient.get<Auction>(this.URL + '/auction/' + id);
  }

  // Châu => function sửa trong auction
  editAuction(auction: Auction): Observable<void> {
    console.log('auction nè : ' + auction.productId);
    return this.httpClient.patch<void>(this.URL + '/auction-edit/' + auction.auctionId, auction);
  }

  save(auction: Auction): Observable<Auction> {
    return this.httpClient.post<Auction>(this.URL + '/create-auction', auction);
  }


  getAllStatusAuction(): Observable<StatusProduct[]> {
    const headerAuth = new HttpHeaders();
    headerAuth.append('admin', 'Bearer' + this.jwtService.getToken());
    return this.httpClient.get<StatusProduct[]>(this.URL + '/getAllStatusAuction');
  }

  saveBidderDto(bidder: Bidder): Observable<Bidder> {
    return this.httpClient.post<Bidder>(this.URL + '/create-bidder', bidder);
  }

  getBidderMax(id: number): Observable<number> {
    return this.httpClient.get<number>(this.URL + '/get-bidder-max/' + id);
  }

  getAuctionByCategory(id: number): Observable<Auction[]> {
    return this.httpClient.get<Auction[]>(this.URL + '/getAuctionByCategory/' + id);
  }
}
