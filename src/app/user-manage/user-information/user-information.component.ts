import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent implements OnInit {
  infoForm: FormGroup;


  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }

  createForm(): void {
    this.infoForm = this.formBuilder.group({
      accountName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 - ]{4-20}$')]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.]{1, 50}@[a-zA-Z0-9]{1, 20}(.[a-zA-Z0-9]){1,4}')]],
      birthday: ['', [Validators.required]],
      idCard: ['', [Validators.required, Validators.pattern('^[0-9]{6,20}')]],
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.pattern('^')]]
    });
  }

}
