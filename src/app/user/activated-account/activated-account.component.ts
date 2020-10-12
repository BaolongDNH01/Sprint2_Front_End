import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {TokenService} from '../token.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Token} from '../token';
import {User} from '../User';

@Component({
  selector: 'app-activated-account',
  templateUrl: './activated-account.component.html',
  styleUrls: ['./activated-account.component.css']
})
export class ActivatedAccountComponent implements OnInit {
  token: string;
  tokenList: Token[];
  idUser = 0;
  idToken: number;
  user: User;
  activated = '';
  constructor(private userService: UserService, private tokenService: TokenService, private activatedRoute: ActivatedRoute) {
    activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.token = paramMap.get('token');
    });
  }

  ngOnInit(): void {
    this.tokenService.findByAll().subscribe(
      next => {
        this.tokenList = next;
      }, error => {},
      () => {
        for (let i = 0; i < this.tokenList.length; i++){
          // tslint:disable-next-line:triple-equals
          if (this.tokenList[i].nameToken == this.token){
            this.idUser = this.tokenList[i].idUser;
            this.idToken = this.tokenList[i].id;
          }
        }
        // tslint:disable-next-line:triple-equals
        if (this.idUser == 0){
          this.activated = 'Kích hoạt tài khoản không thành công, tài khoản đã hết hạn!';
        }
        else {
          this.activated = 'Kích hoạt tài khoản thành công';
          this.userService.findUserById(this.idUser).subscribe(
            next => {
              this.user = next;
            }, error => {},
            () => {
              this.user.enabled = 'true';
              this.userService.saveUser(this.user).subscribe(
                next => {},
                error => {},
                () => {
                  this.tokenService.delete(this.idToken).subscribe(
                    next => {},
                    error => {}
                  );
                }
              );
            }
          );
        }
      }
    );
  }

}
