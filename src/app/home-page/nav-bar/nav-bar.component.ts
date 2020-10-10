import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input, OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ModalForm} from '../modalForm';
import {ModalFormDirective} from '../modalForm.directive';
import {ModalComponent} from '../modalComponent';
import {ModalServiceService} from '../modal-service.service';
import {JwtService} from "../../login/services/jwt.service";



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  @Input() modal: ModalForm[];
  @ViewChild(ModalFormDirective, {
    static: true})
  modalForm: ModalFormDirective;
  currentIndex = -1;
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private jwtService: JwtService, private modalService: ModalServiceService) {
  }
  username: string;
  avatar: string;
  loggedIn = false;

  ngOnDestroy(): void {
    }

  ngOnInit(): void {
    this.modal = this.modalService.getModal();
    if (this.jwtService.getUsername() != null){
      this.username = this.jwtService.getUsername();
      this.avatar = this.jwtService.getAvatar();
      this.loggedIn = true;
    }
  }
  // tslint:disable-next-line:typedef
  renderComponent(index: number) {
    // this.currentIndex = (this.currentIndex + 1);
    const item = this.modal[index];
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(item.components);
    const  viewContainerRef = this.modalForm.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<ModalComponent>(componentFactory);
    componentRef.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.username = null;
    this.avatar = null;
    this.loggedIn = false;
  }

}
