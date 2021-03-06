import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../user';
import {UserService} from '../user.service';
import {JwtService} from '../../login/services/jwt.service';

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
  userName: string;
  message: string;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private jwtService: JwtService) {
  }

  ngOnInit(): void {
    this.userName = this.jwtService.getUsername();
    if (this.userName === '' || this.userName === undefined || this.userName === null) {
      //  đưa ra thông báo login
      document.getElementById('control').click();
    } else {
      this.getUser();
    }
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
  }

  checkEditPassword(): void {
    const oldPass = document.getElementById('oldPass') as HTMLInputElement;
    const newPass = document.getElementById('newPass') as HTMLInputElement;
    const reNewPass = document.getElementById('reNewPass') as HTMLInputElement;
    this.passWord = '';
    if (oldPass.value === '') {
      oldPass.style.border = 'none';
      newPass.style.border = 'none';
      reNewPass.style.border = 'none';
      this.passWord = this.user.password;
      this.editInfo();
      return;
    }

    this.userService.checkPassword(this.userName, oldPass.value).subscribe(
      checkPass => {
        if (!checkPass) {
          oldPass.style.border = '2px solid red';
          newPass.style.border = 'none';
          reNewPass.style.border = 'none';
          document.getElementById('message').style.color = 'yellow';
          this.message = '*lỗi các trường mật khẩu!';
        } else {
          oldPass.style.border = 'none';
          if (newPass.value !== reNewPass.value || newPass.value === '') {
            reNewPass.style.border = '2px solid red';
            newPass.style.border = '2px solid red';
            document.getElementById('message').style.color = 'yellow';
            this.message = '*lỗi các trường mật khẩu!';
          } else {
            reNewPass.style.border = 'none';
            newPass.style.border = 'none';
            this.passWord = newPass.value;
            this.editInfo();
          }
        }
      }
    );
  }

  resetMessage(): void{
    this.message = '';
  }

  backToMenu(): void {
    //  về trang trước
  }
}
