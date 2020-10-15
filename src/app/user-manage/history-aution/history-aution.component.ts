import { Component, OnInit } from '@angular/core';
import {Bidder} from '../bidder';
import {UserService} from '../user.service';
import {JwtService} from '../../login/services/jwt.service';

@Component({
  selector: 'app-history-aution',
  templateUrl: './history-aution.component.html',
  styleUrls: ['./history-aution.component.css']
})
export class HistoryAutionComponent implements OnInit {
  listBidder: Bidder[];
  userName = '';
  currentPage: number;
  totalItem: number;

  constructor(private userService: UserService,
              private jwtService: JwtService) { }

  ngOnInit(): void {
    this.userName = this.jwtService.getUsername();
    this.userName = 'khanhquoc';
    if (this.userName === '' || this.userName === undefined || this.userName === null) {
      //  đưa ra thông báo login
      document.getElementById('control').click();
    } else {
      this.getAllBidderByU();
    }
  }

  getAllBidderByU(): void{
    this.userService.getAllBidderByUName(this.userName).subscribe(
      list => {
        this.listBidder = list;
        this.totalItem = this.listBidder.length;
      },
    );
  }

  backToMenu(): void {
  //  về trang trước
  }
}
