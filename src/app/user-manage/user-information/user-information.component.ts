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
  userEdit: User;
  passWord: string;
  userName = 'khanhquoc';
  message: string;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.userService.getUserByUName(this.userName).subscribe(
      u => {
        this.user = u;
      },
      () => null,
      () => this.createForm()
    );
  }

  createForm(): void {
    this.infoForm = this.formBuilder.group({
      username: [this.user.username, [Validators.required, Validators.pattern('^[a-zA-Z0-9]{4,20}$')]],
      fullName: [this.user.fullName, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
      birthday: [this.user.birthday, [Validators.required]],
      idCard: [this.user.idCard, [Validators.required, Validators.pattern('^[0-9]{6,20}')]],
      phone: [this.user.phone, [Validators.required]],
      address: [this.user.address, [Validators.required]],
      pass: ['']
    });
  }

  editInfo(): void {
    if (this.checkEditPassword()) {
      this.userEdit = this.infoForm.value;
      this.userEdit.password = this.passWord;
      this.userService.editUserInfo(this.userEdit, this.userName).subscribe(
        () => null,
        error => {
          document.getElementById('message').style.color = 'yellow';
          this.message = '*cập nhật không thành công!';
        },
        () => {
          document.getElementById('message').style.color = '#4ef73c';
          this.message = '*cập nhật thành công!';
          this.getUser();
        }
      );
    } else {
      document.getElementById('message').style.color = 'yellow';
      this.message = '*lỗi các trường mật khẩu!';
    }
  }

  checkEditPassword(): boolean {
    const oldPass = document.getElementById('oldPass') as HTMLInputElement;
    const newPass = document.getElementById('newPass') as HTMLInputElement;
    const reNewPass = document.getElementById('reNewPass') as HTMLInputElement;
    this.passWord = '';
    if (oldPass.value === '') {
      oldPass.style.border = 'none';
      newPass.style.border = 'none';
      reNewPass.style.border = 'none';
      this.passWord = this.user.password;
      return true;
    }

    if (oldPass.value !== this.user.password) {
      oldPass.style.border = '2px solid red';
      newPass.style.border = 'none';
      reNewPass.style.border = 'none';
      return false;
    } else {
      oldPass.style.border = 'none';
      if (newPass.value !== reNewPass.value || newPass.value === '') {
        reNewPass.style.border = '2px solid red';
        newPass.style.border = '2px solid red';
        return false;
      } else {
        reNewPass.style.border = 'none';
        newPass.style.border = 'none';
        this.passWord = newPass.value;
        return true;
      }
    }
  }
}
