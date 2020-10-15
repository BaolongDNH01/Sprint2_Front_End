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
  constructor() {
  }

  ngOnInit(): void {
  }

}
