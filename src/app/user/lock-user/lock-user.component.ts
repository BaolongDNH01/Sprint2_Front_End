import { Component, OnInit } from '@angular/core';
import {User} from '../User';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
          this.formLock.patchValue({listUser: this.stringFullUser});
        }
      );
    }
    this.formLock = this.fb.group({
      timeLock: ['', [Validators.min(1), Validators.required]],
      listUser: ['']
    });
    console.log(this.formLock.value.timeLockEnd);
  }
  lockUser(): void{
    console.log(this.userList.length);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.userList.length; i++){
      this.userList[i].timeLock = this.formLock.value.timeLock * 24 * 60 * 60 * 1000;
    }
    this.userService.lockUser(this.userList).subscribe(
      next => {},
      error => {}
    );
  }

}
