import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {User} from '../User';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  formUser: FormGroup;
  user: User = new User();
  userList: User[];
  error = '';
  errorPassword = '';
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.formUser = this.fb.group({
      fullName: ['', [Validators.required]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.][a-zA-Z0-9]+')]],
      birthDay: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.maxLength(12), Validators.minLength(9)]],
      idCard: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.maxLength(12), Validators.minLength(9)]],
      enabled: ['false'],
      confirmPassword: ['']
    });
  }
  addUser(): void {
    if (this.formUser.value.confirmPassword !== this.formUser.value.password){
      this.errorPassword = 'Mật khẩu không trùng nhau';
      return;
    }
    this.error = '';
    console.log(this.formUser.value.fullName);
    this.user = Object.assign({}, this.formUser.value)
    console.log(this.user);
    this.user.rank = 'Bạc';
    this.user.point = 0;
    this.user.flag = 'true';
    console.log('ok');
    this.userService.findAllUser().subscribe(
      next => {
        this.userList = next;
      }, error => {console.log('error');},
      () => {
        this.userService.sendEmail(this.user).subscribe(
          next => {},
          error => {this.error = 'Tài khoản đã tồn tại';},
          () => {
            this.router.navigateByUrl('/send-email');
          }
        );
      }
    );
  }
  reset(): void{
    this.errorPassword = '';
    this.formUser = this.fb.group({
      fullName: ['', [Validators.required]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.][a-zA-Z0-9]+')]],
      birthDay: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.maxLength(12), Validators.minLength(9)]],
      idCard: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.maxLength(12), Validators.minLength(9)]],
      enabled: ['false'],
      confirmPassword: ['']
    });
  }
  close(): void{
    this.router.navigateByUrl('/list-user');
  }
  resetErrorPass(): void{
    this.errorPassword = '';
    this.formUser.patchValue({confirmPassword: ['']});
  }
}

