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
  user: User;
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
    });
  }
  addUser(): void{
    this.user = Object.assign({}, this.formUser.value);
    this.user.rank = 'Bạc';
    this.user.point = 0;
    this.user.flag = 'true';
    this.userService.saveUser(this.user).subscribe(
      next => {},
      error => {},
      () => {
        this.router.navigateByUrl('/');
      }
    );
  }
  reset(): void{
    this.formUser = this.fb.group({
      fullName: ['', [Validators.required]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+[@][a-zA-Z0-9]+[.][a-zA-Z0-9]+')]],
      birthDay: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.maxLength(12), Validators.minLength(9)]],
      idCard: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.maxLength(12), Validators.minLength(9)]],
    });
  }
  close(): void{
    this.router.navigateByUrl('/');
  }
}
