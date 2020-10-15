import { Component, OnInit } from '@angular/core';
import {JwtService} from '../../login/services/jwt.service';

@Component({
  selector: 'app-nav-bar-user',
  templateUrl: './nav-bar-user.component.html',
  styleUrls: ['./nav-bar-user.component.css']
})
export class NavBarUserComponent implements OnInit {
  id: string;

  constructor(private jwtService: JwtService) { }

  ngOnInit(): void {
    this.id = this.jwtService.getUserId();
  }

}
