import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { InsertDirectiveDirective } from './insert-directive.directive';
import { ShapeYi } from './shape-yi/shape-yi.component';
import { ShapeTianComponent } from './shape-tian/shape-tian.component';
import { ShapeShanComponent } from './shape-shan/shape-shan.component';
import { ShapeZhiComponent } from './shape-zhi/shape-zhi.component';
import { appService } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private curComponent;
  
 

  @ViewChild(InsertDirectiveDirective) adHost: InsertDirectiveDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,public service: appService) { }
  private createComponent(){
    let viewContainerRef = this.adHost.viewContainerRef;
    let component = [ShapeYi,ShapeTianComponent,ShapeShanComponent,ShapeZhiComponent][Math.round(Math.random()*3)];

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(ShapeShanComponent);
    this.curComponent = viewContainerRef.createComponent(componentFactory);

    this.curComponent.instance.animate();

  }
  
  ngOnDestroy(){}
  
  ngOnInit(){
    this.createComponent();
    this.service.isAniFinshed.subscribe( isAniFinished => {
      if( isAniFinished ){
        this.destroy();
      }
    } )
    
  }
  destroy(){
    // this.curComponent.destroy();
    this.curComponent = null
    this.createComponent();
  }
}
