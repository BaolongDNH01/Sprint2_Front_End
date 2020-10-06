import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {AuthLoginComponent} from '../../login/components/auth-login/auth-login.component';
import {ModalForm} from '../modalForm';
import {ModalFormDirective} from '../modalForm.directive';
import {ModalComponent} from "../modalComponent";


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @Input() modal: ModalForm[];
  @ViewChild(ModalFormDirective, {
    static: true})
  modalForm: ModalFormDirective;
  currentIndex = -1;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    // this.renderComponent(0);
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

}
