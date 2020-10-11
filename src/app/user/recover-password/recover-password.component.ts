import { Component, OnInit } from '@angular/core';
import {ModalServiceService} from '../../home-page/modal-service.service';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RecoverPassword} from './RecoverPassword';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {
  recoverForm: FormGroup;
  recoverRequest: RecoverPassword;

  constructor(private modalServiceService: ModalServiceService,
              private userService: UserService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.recoverForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_]*@[a-zA-Z0-9_]*\.[a-zA-Z]{3}$/)]]
    });
  }

  loadModal(index: number): void {
    this.modalServiceService.load(index);
  }

  proceed(): void {
    if (this.recoverForm.valid){
      this.recoverRequest = this.recoverForm.value;
      console.log(this.recoverRequest);
      this.userService.recoverRequest(this.recoverRequest).subscribe(
        next => {},
          error => { },
        () => {
         this.router.navigateByUrl('/');
        });
    }
  }
}
