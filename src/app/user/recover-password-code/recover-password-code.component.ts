import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-recover-password-code',
  templateUrl: './recover-password-code.component.html',
  styleUrls: ['./recover-password-code.component.css']
})
export class RecoverPasswordCodeComponent implements OnInit {
  confirmCodeForm: FormGroup;
  username: string;
  validated = true;
  countInputLeft = 3;
  confirmCode: string;

  constructor(private userService: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder) {
    this.confirmCodeForm = this.formBuilder.group({
      confirmCode: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.username = params.get('username');
      console.log(this.username);
    });
  }

  onSubmit(): void {
    if (this.confirmCodeForm.valid){
      this.confirmCode = this.confirmCodeForm.value.confirmCode;
      this.userService.checkCode(this.confirmCode, this.username).subscribe(next => {
        },
        error => {
          this.validated = false;
          this.countInputLeft -= 1;
          if (this.countInputLeft <= 0) {
            alert('Bạn đã nhập sai 3 lần, mã xác nhận đã bị xoá');
            this.userService.deleteCode(this.username).subscribe(
              () => {
              },
              error1 => {
              },
              () => this.router.navigateByUrl('/').then(window.location.reload));
          }
        },
        () => (this.router.navigateByUrl('/reset-password/' + this.username)));
    }
  }

}
