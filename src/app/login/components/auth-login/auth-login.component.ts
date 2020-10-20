import {Component, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LoginInfo } from '../../models/login-info';
import { AuthService } from '../../services/auth.service';
import { JwtService } from '../../services/jwt.service';
import {ModalServiceService} from '../../../home-page/modal-service.service';
import {fadeInAnimation, fadeOutAnimation} from 'angular-animations';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  loginForm: FormGroup;
  loginInfo: LoginInfo;
  state: boolean;
  isLoggedIn = false;
  isLogInFailed = false;

  userId: string;
  roles: string[] = [];
  username: string;
  authority: string;
  email: string;
  avatar: string;

  checkboxMarked = false;
  @Output() loadComponent = new EventEmitter<number>();

  // socialSignUpInfo: SocialSignUpInfo;
  // socialUser: SocialUser;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private jwtService: JwtService,
    private modalServiceService: ModalServiceService
    // private socialAuthService: SocialAuthService,
    // private formatUsername: FormatUsernameService,
  ) {
  }

  loadForm(index: number): void{
    this.state = false;
    this.modalServiceService.load(index);
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.state = true;
    if (this.jwtService.getToken()) {
      this.isLoggedIn = true;
      this.username = this.jwtService.getUsername();
      this.roles = this.jwtService.getAuthorities().map(r => r.replace('ROLE_', '').toLowerCase());
      this.email = this.jwtService.getEmail();
      this.avatar = this.jwtService.getAvatar();

      // Handling authorities granted
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_MEMBER') {
          this.authority = 'member';
          return false;
        }
        return true;
      });
    }

    if (window.localStorage.getItem('usernameRemember')) {
      this.username = this.jwtService.getUsername();
    }

    // this.subscription = this.socialAuthService.authState.subscribe((user) => {
    //   this.socialUser = user;
    //   this.isLoggedIn = (user != null);
    // });
  }

  onLogin(): void {
    this.loginInfo = new LoginInfo(
      this.loginForm.value.username,
      this.loginForm.value.password
    );
    this.authLogin(this.loginInfo);
  }

  authLogin(loginInfo: LoginInfo): void {
    this.subscription = this.authService.authLogin(loginInfo).subscribe({
      next: data => {
        this.jwtService.saveUserId(data.userId);
        this.jwtService.saveToken(data.token);
        this.jwtService.saveUsername(data.username);
        this.jwtService.saveAuthorities(data.authorities);
        this.jwtService.saveEmail(data.email);
        this.jwtService.saveAvatar(data.avatar);
        this.isLoggedIn = true;
        this.reloadPage();

        if (this.checkboxMarked) {
          window.localStorage.setItem('usernameRemember', this.jwtService.getUsername());
        } else {
          window.localStorage.clear();
        }
      },
      error: (err) => {
        console.error(err);
        this.isLogInFailed = true;
      },
    });
  }

  // loginSocial(social: string): void {
  //   switch (social) {
  //     case 'fb':
  //       this.processSocialLogin(FacebookLoginProvider.PROVIDER_ID);
  //       break;
  //     case 'gg':
  //       this.processSocialLogin(GoogleLoginProvider.PROVIDER_ID);
  //       break;
  //     default:
  //       alert('Something went wrong !');
  //       break;
  //   }
  // }
  //
  // processSocialLogin(socialProvider: string): void {
  //   this.socialAuthService.signIn(socialProvider)
  //     .then(userData => {
  //       const usernameConverted = this.formatUsername.removeVietnameseTones(userData.name).replace(/\s/g, '');
  //       this.socialSignUpInfo = new SocialSignUpInfo(
  //         usernameConverted,
  //         userData.name,
  //         userData.email,
  //         userData.provider,
  //         userData.id,
  //         userData.photoUrl,
  //       );
  //
  //       this.subscription = this.authService.signUpSocialUser(this.socialSignUpInfo).subscribe({
  //         next: () => {
  //           this.loginInfo = new LoginInfo(
  //             this.socialSignUpInfo.username,
  //             this.socialSignUpInfo.userPassword);
  //           this.authLogin(this.loginInfo);
  //         },
  //         error: () => {
  //           // By passing status code 409 -> Still login when account has existed
  //           this.loginInfo = new LoginInfo(
  //             this.socialSignUpInfo.username,
  //             this.socialSignUpInfo.userPassword);
  //           this.authLogin(this.loginInfo);
  //         }
  //       });
  //     });
  // }



  valid(field: string, errorCode: string): boolean {
    return (
      this.loginForm.get(field).hasError(errorCode) &&
      this.loginForm.get(field).touched
    );
  }

  logOut(): void {
    if (window.confirm('Are you sure to logout ?')) {
      this.jwtService.logOut();
      this.reloadPage();
    }
    this.jwtService.saveUsername(window.localStorage.getItem('usernameRemember'));
  }

  reloadPage(): void {
    window.location.reload();
    window.location.href = '';
  }

  isRememberChecked(e: any): void {
    this.checkboxMarked = e.target.checked;
  }


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
