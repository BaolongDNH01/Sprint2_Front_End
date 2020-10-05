import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../user';
import {UserService} from '../user.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent implements OnInit {
  infoForm: FormGroup;
  user: User;
  userName = '';

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {
  }

  ngOnInit(): void {
     this.userService.getUserByUName(this.userName).subscribe(
       u => this.user = u,
       () => null,
       () => this.createForm()
     );
  }

  createForm(): void {
    this.infoForm = this.formBuilder.group({
      accountName: [this.user.accountName, [Validators.required, Validators.pattern('^[a-zA-Z0-9 - ]{4-20}$')]],
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.pattern('^[a-zA-Z0-9.]{1, 50}@[a-zA-Z0-9]{1, 20}(.[a-zA-Z0-9]){1,4}')]],
      birthday: [this.user.birthday, [Validators.required]],
      idCard: [this.user.idCard, [Validators.required, Validators.pattern('^[0-9]{6,20}')]],
      oldPassword: ['', [Validators.required, Validators.pattern(this.user.password)]],
      newPassword: ['', [Validators.required]],
      phoneNumber: [this.user.phoneNumber, [Validators.required]],
      address: [this.user.address, [Validators.required]]
    });
  }

  editInfo(): void{
    this.user = this.infoForm.value;
    this.userService.editUserInfo(this.user, this.userName);
  }
}
