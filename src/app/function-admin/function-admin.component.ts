import { Component, OnInit } from '@angular/core';
import {JwtService} from '../login/services/jwt.service';

@Component({
  selector: 'app-function-admin',
  templateUrl: './function-admin.component.html',
  styleUrls: ['./function-admin.component.css']
})
export class FunctionAdminComponent implements OnInit {
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
