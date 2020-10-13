import {Component, OnInit, Output} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../User';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {ValidatePassword} from './PasswordValidate';
import {ModalServiceService} from '../../home-page/modal-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() loadComponent = new EventEmitter<string>();
  registerForm: FormGroup;
  passwordForm: FormGroup;
  newUser = new User();
  KEY = '6LcIN88ZAAAAANNmXRhyKgePhkgK_kx1MJMRyGsE';
  usernameExist = false;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private modalServiceService: ModalServiceService) {
  }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.maxLength(16)]],
      confirm_password: new FormControl([''])
    }, {validators: ValidatePassword('password', 'confirm_password')});

    this.registerForm = this.formBuilder.group({
        username: ['', [Validators.required, Validators.maxLength(25)]],
        user_password: this.passwordForm,
        fullName: ['', [Validators.required, Validators.maxLength(50)]],
        email: ['',
          [
            Validators.required,
            Validators.maxLength(55),
            Validators.pattern(/^[a-zA-Z0-9_]*@[a-zA-Z0-9_]*\.[a-zA-Z]{3}$/)
          ]
        ],
        birthday: ['', Validators.required],
        address: ['', [Validators.required, Validators.maxLength(255)]],
        phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{9,12}$')]],
        recaptchaReactive: ['', Validators.required],
        idCard: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]]
      }
    );
  }

  resolved(captchaResponse: string): void {
    console.log(`Resolved response token: ${captchaResponse}`);
    this.registerForm.controls.recaptchaReactive.setValue(captchaResponse);
    console.log(this.registerForm.value.recaptchaReactive);
  }

  loadForm(index: number): void {
    this.modalServiceService.load(index);
  }

  onSubmit(): void {
    if ((this.registerForm.valid) && (this.passwordForm.valid)) {
      console.log(this.registerForm.value.recaptchaReactive);
      // this.newUser = Object.assign({}, this.registerForm.value);
      this.newUser.username = this.registerForm.value.username;
      this.newUser.fullName = this.registerForm.value.fullName;
      this.newUser.address = this.registerForm.value.address;
      this.newUser.email = this.registerForm.value.email;
      this.newUser.birthday = this.registerForm.value.birthday;
      this.newUser.phone = this.registerForm.value.phoneNumber;
      this.newUser.idCard = this.registerForm.value.idCard;
      this.newUser.password = this.passwordForm.value.password;
      this.newUser.rank = 'Bạc';
      this.newUser.point = 0;
      this.newUser.flag = 'true';
      console.log(this.newUser);
      this.userService.sendEmail(this.newUser, this.registerForm.value.recaptchaReactive).subscribe(
        () => {},
        error => {this.usernameExist = true; },
        () => {this.router.navigateByUrl('/send-mail'); });
    }else { console.log('error'); }
  }
}
