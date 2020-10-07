import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalForm} from './home-page/modalForm';
import {ModalServiceService} from './home-page/modal-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  modal: ModalForm[];
  constructor(private modalService: ModalServiceService) {
  }

  ngOnInit(): void {
    this.modal = this.modalService.getModal();
  }

}
