import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {UserService} from '../user.service';
import {User} from '../User';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {
  user: User;
  id: number;
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) {
    activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = Number(paramMap.get('id'));
    });
    userService.findUserById(this.id).subscribe(
      next => {
        this.user = next;
      }, error => {
        this.user = new User();
      }
    )
  }

  ngOnInit(): void {
  }

}
