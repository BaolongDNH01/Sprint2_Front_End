import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {HistoryRegisterService} from '../../service/history-register.service';
import {HistoryRegisterModel} from '../../model/historyRegister.model';

@Component({
  selector: 'app-history-register',
  templateUrl: './history-register.component.html',
  styleUrls: ['./history-register.component.css']
})
export class HistoryRegisterComponent implements OnInit,OnDestroy {
  public subscription: Subscription;
  public historyRegister: HistoryRegisterModel[] = [];

  constructor(
    public historyRegisterService: HistoryRegisterService
  ) { }

  ngOnInit(): void {
    this.subscription = this.historyRegisterService.findAll().subscribe((data:HistoryRegisterModel[])=>{
      this.historyRegister = data;
    });
  }
  ngOnDestroy(): void {
  }

}
