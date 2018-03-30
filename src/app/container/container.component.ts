import { Component, OnInit,AfterViewChecked } from '@angular/core';
import { appService } from '../app.service';
// 当组件动画结束之后，游戏盒子内展示的真正内容
@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit,AfterViewChecked {
  private boxes:Array<any>;
  private start:number = 0;
  constructor( public service: appService) { }

  ngOnInit() {
     
  }
  ngAfterViewChecked(){
    let preLength = this.boxes.length;
    // debugger;
    let count:number = 0;//评分，系统 每消掉一行加1分，连续消掉n行， 分数 = n*n
    this.boxes.forEach( (item,index) => {
          if((/1111111111/).test(item.join(''))){
            this.boxes.splice(index,1);
            count++;
          }
          
    })
    this.service.scores += count*count
    while(this.boxes.length < preLength){
      this.boxes.unshift('0000000000'.split(''))
    }
  }
  render(){
    let beginIndex : number; //开始渲染的行数；
    this.boxes =  this.service.gameBox;
    try{
      this.boxes.forEach((el,index) => {
        el.forEach(element => {
            if( element ===1 ){
                throw new Error( index.toString() )
            }
        });
    });
    }catch(index){
      this.start = index;
    }
      
  }

}
