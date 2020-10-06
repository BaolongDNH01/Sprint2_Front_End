import { Component, OnInit } from '@angular/core';
import {Bidder} from '../bidder';
import {UserService} from '../user.service';

@Component({
  selector: 'app-history-aution',
  templateUrl: './history-aution.component.html',
  styleUrls: ['./history-aution.component.css']
})
export class HistoryAutionComponent implements OnInit {
  listBidder: Bidder[];
  userName = 'khanhne';
  currentPage: number;
  totalItem: number;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllBidderByU();
  }

  getAllBidderByU(): void{
    this.userService.getAllBidderByUName(this.userName).subscribe(
      list => {
        this.listBidder = list;
        this.totalItem = this.listBidder.length;
      },
    );
  }
}
