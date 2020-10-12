import {Directive, EventEmitter, Output, ViewContainerRef} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[modalForm]',
})
export class ModalFormDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
  @Output() loadComponent = new EventEmitter<number>();
}
