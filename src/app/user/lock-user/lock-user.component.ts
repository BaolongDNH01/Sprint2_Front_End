import { Component, OnInit } from '@angular/core';
import {User} from '../User';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../user.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-lock-user',
  templateUrl: './lock-user.component.html',
  styleUrls: ['./lock-user.component.css']
})
export class LockUserComponent implements OnInit {
  id: string;
  ids: string[];
  userList: User[] = new Array();
  user: User;
  stringFullUser = '';
  formLock: FormGroup;
  dateHt = '';
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private fb: FormBuilder) {
    activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('ids');
    });
  }

  ngOnInit(): void {
    this.ids = this.id.split(',');
    for (let i = 0; i < this.ids.length; i++){
      this.userService.findUserById(Number(this.ids[i])).subscribe(
        next => {
          this.user = next;
        }, error => {
          this.user = new User();
        }, () => {
          this.userList.push(this.user);
          this.stringFullUser += this.user.fullName + '\n';
          const date = new Date();
          let month: string;
          let day: string;
          if (date.getMonth() + 1 < 10){
            month = '0' + (date.getMonth() + 1);
          }else {
            month = String(date.getMonth() + 1);
          }
          if (date.getDate() < 10){
            day = '0' + date.getDate();
          }else {
            day = String(date.getDate());
          }
          this.dateHt = date.getFullYear() + '-' + month + '-' + day;
          this.formLock.patchValue({listUser: this.stringFullUser});
          this.formLock.patchValue({timeLockBegin: this.dateHt});
        }
      );
    }
    this.formLock = this.fb.group({
      timeLockBegin: [''],
      timeLockEnd: [''],
      listUser: ['']
    });
    console.log(this.formLock.value.timeLockEnd);
  }
  lockUser(): void{
    console.log(this.formLock.value.timeLockBegin);
  }

}
