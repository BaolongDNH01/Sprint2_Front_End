import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-recover-password-code',
  templateUrl: './recover-password-code.component.html',
  styleUrls: ['./recover-password-code.component.css']
})
export class RecoverPasswordCodeComponent implements OnInit {
  confirmCode: string;
  username: string;
  validated = true;
  constructor(private userService: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
     this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
       this.username = params.get('username');
     });
  }

  onSubmit(): void {
    if (this.confirmCode.length < 10){
      return;
    }
    this.userService.checkCode(this.confirmCode, this.username).subscribe(next => {},
      error => {this.validated = false; },
      () => (this.router.navigateByUrl('/set-password/' + this.username)));
  }

}
