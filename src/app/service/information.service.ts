import { Injectable } from '@angular/core';
import {CrudService} from './CrudService';
import {InformationModel} from '../model/informaton.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InformationService extends CrudService<InformationModel,number>{

  constructor(protected http: HttpClient) {
    super(http,'http://localhost:8080/information')
  }
}
