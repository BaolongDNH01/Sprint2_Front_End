import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Bidder} from './bidder';
import {Auction} from './auction';

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

  findAllProductAuction(): Observable<Auction[]> {
    return this.httpClient.get<Auction[]>(this.URL + '/getAllAuction');
  }

  findById(id: number): Observable<Auction> {
    console.log('toi roi ne');
    return this.httpClient.get<Auction>(this.URL + '/auction/' + id);
  }

  editAuction(auction: Auction): Observable<void> {
    console.log('toi day roi');
    return this.httpClient.patch<void>(this.URL + '/auction-edit/' + auction.auctionId, auction);
  }
}
