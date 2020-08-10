import { Component, OnInit,AfterViewChecked,DoCheck } from '@angular/core';
import { appService } from '../app.service';
// 当组件动画结束之后，游戏盒子内展示的真正内容
@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit,AfterViewChecked,DoCheck {
  public boxes:Array<any>;
  public start:number = 0;
  constructor( public service: appService) { }

  ngOnInit() {
     
  }
  ngAfterViewChecked(){
    
  }
  ngDoCheck() {//在这里检测 是否有可以得分的一行 ，如果有就继续调用score
    let mark = false;
    this.boxes.forEach( (item,index) => {
      if((/1111111111/).test(item.join(''))){
          mark = true;
      }  
    })
    if( mark ){
      // this.score();
    }

  }
  score(){
    let preLength = this.boxes.length;
    // debugger;
    let count:number = 0;//评分，系统 每消掉一行加1分，连续消掉n行， 分数 = n*n

    let realBoxes = [...this.boxes];

    for( let i = 0, L = preLength; i < L ; i++ ){
      let item = realBoxes[i];
      if((/1111111111/).test(item.join(''))){
        realBoxes.splice(i,1);
        count++;
        i--;
        L--;
      }
    }

    this.service.scores += ( count*count )

    let needChangeBoxes: boolean = false;


    while(realBoxes.length < preLength){

      needChangeBoxes = true;      
      realBoxes.unshift([0,0,0,0,0,0,0,0,0,0])

    }

    if(needChangeBoxes){
      this.service.gameBox = this.boxes = realBoxes;
    }
    this.changeDifficulty();
  }

  changeDifficulty(){
    if( this.service.difficulty > this.service.maxDifficulty ){
      this.service.difficulty = ( this.service.initialDifficulty - Math.floor(this.service.scores / 10) )
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
      this.start = parseInt(index);
    }
    this.score();
      
  }

}
