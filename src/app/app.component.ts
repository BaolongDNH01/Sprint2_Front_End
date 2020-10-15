import {Component, OnInit} from '@angular/core';
import {JwtService} from './login/services/jwt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  roles: string[];
  user: string;
  constructor(private jwt: JwtService) {
    this.roles = jwt.getAuthorities();
    if (this.roles.length === 0){
      this.user = 'member';
      return;
    }
    this.roles.every(role => {
      if (role === 'ROLE_MEMBER'){
        this.user = 'member';
        return;
      }
    });
    this.roles.every(role => {
      if (role === 'ROLE_ADMIN'){
        this.user = 'admin';
        return;
      }
    });
  }

  ngOnInit(): void {
  }

}
