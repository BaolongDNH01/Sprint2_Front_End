import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Bidder} from './bidder';
import {Auction} from './auction';
import {Product} from '../product/product';
import {StatusProduct} from '../product/statusProduct';


@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  URL = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {
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
    return this.httpClient.patch<void>(this.URL + '/auction-edit/' + auction.auctionId, auction);
  }

  save(auction: Auction): Observable<Auction> {
    return this.httpClient.post<Auction>(this.URL + '/create-auction', auction);
  }


  getAllStatusAuction(): Observable<StatusProduct[]> {
    console.log('chua qua lun ne');
    return this.httpClient.get<StatusProduct[]>(this.URL + '/getAllStatusAuction');
  }
  saveBidderDto(bidder: Bidder): Observable<Bidder> {
    return this.httpClient.post<Bidder>(this.URL + '/create-bidder', bidder);
  }
}
