import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {ValidatePassword} from '../register/PasswordValidate';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ChangePassword} from './ChangePassword';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  passwordForm: FormGroup;
  username: string;
  changePassword: ChangePassword;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    }, {validators: ValidatePassword('password', 'confirm_password')});
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.username = params.get('username');
    });
  }

  onSubmit(): void {
    if (this.passwordForm.valid) {
      console.log(this.passwordForm);
      this.changePassword = {username: this.username, password: this.passwordForm.value.password};
      this.userService.changePassword(this.changePassword).subscribe(next => {
        },
        error => {
        alert('Đã phát sinh lỗi. Xin Bạn hãy nhập lại.');
        },
        () => {
          const r = confirm('Mật Khẩu Thay Đổi Thành Công');
          if (r === true){
            this.router.navigateByUrl('/').then(window.location.reload);
          }else { window.location.reload(); }
        });
    }
  }

}
