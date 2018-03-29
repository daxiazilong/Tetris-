import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[component]'
})
export class InsertDirectiveDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
