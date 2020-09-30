import { Injectable } from '@angular/core';
import {CrudService} from './CrudService';
import {HistoryRegisterModel} from '../model/historyRegister.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistoryRegisterService extends CrudService<HistoryRegisterModel,number>{

  constructor(protected http: HttpClient) {
    super(http,'http://localhost:8080/historyRegister')
  }
}
