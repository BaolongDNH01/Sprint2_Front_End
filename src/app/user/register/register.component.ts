import {Component, OnInit, Output} from '@angular/core';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() loadComponent = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }


  backLogin(): void{
    this.loadComponent.emit('loadComponent');
  }
}
