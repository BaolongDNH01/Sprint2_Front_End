import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Rank} from './rank';

@Injectable({
  providedIn: 'root'
})
export class RankService {
  API_URL = 'http://localhost:8080';
  constructor(private httpClient: HttpClient) { }
  findAllRank(): Observable<Rank[]>{
    return this.httpClient.get<Rank[]>(this.API_URL + '/rank');
  }
}
