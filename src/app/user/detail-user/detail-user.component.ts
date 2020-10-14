import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {UserService} from '../user.service';
import {User} from '../User';
import {JwtService} from '../../login/services/jwt.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {
  user: User;
  id: number;
  roles: string[];
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private jwt: JwtService, private router: Router) {
    this.roles = jwt.getAuthorities();
    if (this.roles.length === 0){
      router.navigateByUrl('**');
    }
    this.roles.every(role => {
      if (role === 'ROLE_MEMBER'){
        router.navigateByUrl('**');
        return;
      }
    });
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
