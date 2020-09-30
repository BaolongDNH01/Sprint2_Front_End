import { Injectable } from '@angular/core';
import {CrudService} from './CrudService';
import {HistoryAuctionModel} from '../model/historyAuction.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistoryAuctionService extends CrudService<HistoryAuctionModel, number>{

  constructor(protected http: HttpClient) {
    super(http,'http://localhost:8080/historyAuction')
  }
}
