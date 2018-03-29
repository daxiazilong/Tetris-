import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ShapeYi } from './shape-yi/shape-yi.component';
import { ShapeTianComponent } from './shape-tian/shape-tian.component';
import { ShapeShanComponent } from './shape-shan/shape-shan.component';
import { ShapeZhiComponent } from './shape-zhi/shape-zhi.component';
import { InsertDirectiveDirective } from './insert-directive.directive';
import { appService } from './app.service';


@NgModule({
  declarations: [
    AppComponent,
    ShapeYi,
    ShapeTianComponent,
    ShapeShanComponent,
    ShapeZhiComponent,
    InsertDirectiveDirective
  ],
  imports: [
    BrowserModule
  ],
  entryComponents: [ 
    ShapeYi,
    ShapeTianComponent,
    ShapeShanComponent,
    ShapeZhiComponent
   ],
  providers: [appService],
  bootstrap: [AppComponent]
})
export class AppModule { }
