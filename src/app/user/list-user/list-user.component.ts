import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../User';
import {RankService} from '../rank.service';
import {Rank} from '../rank';
import {Router} from '@angular/router';
import {JwtService} from '../../login/services/jwt.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  userList: User[];
  userListCheck: User[] = new Array();
  ids: number[] = new Array();
  rankList: Rank[];
  valueId = '';
  valueFullName = '';
  valueAddress = '';
  valueEmail = '';
  valueRank = '';
  page = 1;
  pageSize = 5;
  pageMax: number;
  errorCheck = '';
  roles: string[];
  constructor(private userService: UserService, private rankService: RankService, private router: Router, private jwt: JwtService) {
    this.roles = jwt.getAuthorities();
    if (this.roles.length === 0){
      router.navigateByUrl('**');
    }
    this.roles.every(role => {
      if (role === 'ROLE_MEMBER'){
        router.navigateByUrl('**');
        return;
      }
    });
    userService.findAllUserActivated().subscribe(
      next => {
        this.userList = next;
        this.userListCheck = next;
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
    this.userService.findAllUserActivated().subscribe(
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
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.userList.length; i++){
          // tslint:disable-next-line:prefer-for-of
          for (let j = 0; j < this.ids.length; j++){
            // tslint:disable-next-line:triple-equals
            if (this.userList[i].userId == this.ids[j]){
              this.userList[i].check = true;
            }
          }
        }
        this.pageMax = Math.ceil(this.userList.length / this.pageSize);
        this.page = 1;
      }
    );
  }
  goPage(page): void{
    this.page = page;
  }
  addUser(id: number): void{
    this.errorCheck = '';
    for (let i = 0; i < this.userList.length; i++){
      if (id === this.userList[i].userId && this.userList[i].check === false){
        this.userList[i].check = true;
      }
      else if (id === this.userList[i].userId && this.userList[i].check === true){
        this.userList[i].check = false;
      }
      // tslint:disable-next-line:triple-equals
      else if (id == this.userList[i].userId){
        this.userList[i].check = true;
      }
    }
    this.userListCheck = this.userList.filter(res => {
      // tslint:disable-next-line:triple-equals
      return id == res.userId;
    });
    // tslint:disable-next-line:variable-name
    let number = -1;
    for (let i = 0; i < this.ids.length; i++){
      if (this.ids[i] === this.userListCheck[0].userId ){
        number = i;
      }
    }
    if (number !== -1){
      this.ids.splice(number, 1);
    }
    else {
      this.ids.push(this.userListCheck[0].userId);
    }
    console.log(this.ids);
  }
  lockUser(): void{
    if (this.ids.length === 0){
      this.errorCheck = 'Bạn cần chọn ít nhất 1 thành viên';
    }
    const idList = new Array();
    for (let i = 0; i < this.userList.length; i++){
      if (this.userList[i].flag === 'true' && this.userList[i].check === true){
        idList.push(this.userList[i].userId);
      }
    }
    if (idList.length === 0){
      this.errorCheck = 'Các thành viên bạn đã bị khóa';
    }
    else {
      this.router.navigateByUrl('fc-admin/lock-user/' + idList);
    }
  }
  unlockUser(): void{
    if (this.ids.length === 0){
      this.errorCheck = 'Bạn cần chọn ít nhất 1 thành viên';
      return;
    }
    const idList = new Array();
    for (let i = 0; i < this.userList.length; i++){
      if (this.userList[i].flag === 'false' && this.userList[i].check === true){
        idList.push(this.userList[i].userId);
      }
    }
    if (idList.length === 0){
      this.errorCheck = 'Các thành viên bạn chọn chưa bị khóa';
    }
    else {
      this.router.navigateByUrl('fc-admin/unlock-user/' + idList);
    }
  }
  delete(): void{
      if (this.ids.length === 0){
      this.errorCheck = 'Bạn cần chọn ít nhất 1 thành viên';
    }else {
      this.router.navigateByUrl('fc-admin/delete/' + this.ids);
    }
  }

}
