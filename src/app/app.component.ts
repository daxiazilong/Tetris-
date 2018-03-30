import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { InsertDirectiveDirective } from './insert-directive.directive';
import { InsertContainerDirective } from './container-directive.directive';
import { ShapeYi } from './shape-yi/shape-yi.component';
import { ShapeTianComponent } from './shape-tian/shape-tian.component';
import { ShapeShanComponent } from './shape-shan/shape-shan.component';
import { ShapeZhiComponent } from './shape-zhi/shape-zhi.component';
import { ContainerComponent } from './container/container.component';

import { appService } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private curComponent;
  private curContainer = null;
  private isStart:boolean = false;

  @ViewChild(InsertDirectiveDirective) adHost: InsertDirectiveDirective;
  @ViewChild(InsertContainerDirective) containerHost: InsertContainerDirective;
  constructor(private componentFactoryResolver: ComponentFactoryResolver,public service: appService) { }
  private createComponent(){
    let viewContainerRef = this.adHost.viewContainerRef;
    let component = [ShapeYi,ShapeShanComponent,ShapeZhiComponent][Math.round(Math.random()*2)];
// ShapeTianComponent我目前还没有完成，
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    this.curComponent = viewContainerRef.createComponent(componentFactory);

    this.curComponent.instance.animate();

  }
  private createContainer(){
    if( this.curContainer === null ){
      let viewContainerRef = this.containerHost.viewContainerRef;
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(ContainerComponent);
      this.curContainer = viewContainerRef.createComponent(componentFactory);
    }   
    this.curContainer.instance.render();
  }
  
  ngOnDestroy(){}
  
  ngOnInit(){
    // this.start()
  }
  start(){
    this.createComponent();//创造组件
    this.service.isAniFinshed.subscribe( isAniFinished => {//如果组件已完成
      if( isAniFinished ){
        this.destroy();
        this.createContainer();
        this.createComponent();
      }
    } )
    document.onkeydown = this.handleMove.bind(this);
  }
  handleStart(){
      this.isStart = true;
      this.start();
  }
  destroy(){
    this.curComponent.destroy();
    this.curComponent = null
  }
  handleMove(e){
    switch( e.key ){
      case 'ArrowRight':
              this.curComponent.instance.moveRight();
              break;
      case 'ArrowLeft':
              this.curComponent.instance.moveLeft();
              break; 
      case 'ArrowUp':
              this.curComponent.instance.transform();
      default:
              break;
    }
  }
}
