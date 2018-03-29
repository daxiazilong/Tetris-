import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appInsertDirective]'
})
export class InsertDirectiveDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
