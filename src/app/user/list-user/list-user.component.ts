import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../User';
import {RankService} from '../rank.service';
import {Rank} from '../rank';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  userList: User[];
  rankList: Rank[];
  valueId = '';
  valueFullName = '';
  valueAddress = '';
  valueEmail = '';
  valueRank = '';
  page = 1;
  pageSize = 5;
  pageMax: number;
  constructor(private userService: UserService, private rankService: RankService) {
    userService.findAllUser().subscribe(
      next => {
        this.userList = next;
      }, error => {
        this.userList = new Array();
      }, () => {
        this.pageMax = Math.ceil(this.userList.length / this.pageSize);
        this.page = 1;
        rankService.findAllRank().subscribe(
          next => {
            this.rankList = next;
          }
        );
      }
    );
  }

  ngOnInit(): void {
  }

  search(): void{
    this.userService.findAllUser().subscribe(
      next => {
        this.userList = next;
      }, error => {
        this.userList = new Array();
      }, () => {
        if (this.valueId !== null){
          this.userList = this.userList.filter(res => {
            return (res.userId).toString().match(this.valueId.toString());
          });
        }
        if (this.valueFullName !== null){
          this.userList = this.userList.filter(res => {
            return res.fullName.toLocaleLowerCase().match(this.valueFullName.toLocaleLowerCase());
          });
        }
        if (this.valueAddress !== null){
          this.userList = this.userList.filter(res => {
            return res.address.toLocaleLowerCase().match(this.valueAddress.toLocaleLowerCase());
          });
        }
        if (this.valueEmail !== null){
          this.userList = this.userList.filter(res => {
            return res.email.toLocaleLowerCase().match(this.valueEmail.toLocaleLowerCase());
          });
        }
        if (this.valueRank !== ''){
          this.userList = this.userList.filter(res => {
            return res.rank.match(this.valueRank);
          });
        }
        this.pageMax = Math.ceil(this.userList.length / this.pageSize);
        this.page = 1;
      }
    );
  }
  goPage(page): void{
    this.page = page;
  }

}
