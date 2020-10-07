import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[modalForm]',
})
export class ModalFormDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
