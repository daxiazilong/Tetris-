import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[container]'
})
export class InsertContainerDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}