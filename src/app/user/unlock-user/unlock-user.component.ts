import { Component, OnInit } from '@angular/core';
import {User} from '../User';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-unlock-user',
  templateUrl: './unlock-user.component.html',
  styleUrls: ['./unlock-user.component.css']
})
export class UnlockUserComponent implements OnInit {
  id: string;
  ids: string[];
  userList: User[] = new Array();
  user: User;
  stringFullUser = '';
  formLock: FormGroup;
  constructor(private router: Router, private userService: UserService, private activatedRoute: ActivatedRoute, private fb: FormBuilder) {
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
      listUser: ['']
    });
    console.log(this.formLock.value.timeLockEnd);
  }
  unlockUser(): void{
    this.userService.unlockUser(this.userList).subscribe(
      next => {},
      error => {},
      () => {
        this.router.navigateByUrl('/');
      }
    );
  }
  close(): void{
    this.router.navigateByUrl('/');
  }
}
