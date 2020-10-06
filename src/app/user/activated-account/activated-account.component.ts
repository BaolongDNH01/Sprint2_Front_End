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
  idUser: number;
  idToken: number;
  user: User;
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
    );
  }

}
