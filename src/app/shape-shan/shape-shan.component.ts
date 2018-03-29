import { Component, OnInit } from '@angular/core';
import { CommonMethods } from '../interface/common';
import { appService } from '../app.service';
@Component({
  selector: 'app-shape-shan',
  templateUrl: './shape-shan.component.html',
  styleUrls: ['./shape-shan.component.css']
})
export class ShapeShanComponent implements OnInit,CommonMethods {
  private curDeg:number = 0;
  private curTop:number = 0;
  private curLeft:number = 0;

  constructor(public service: appService) {  }
  transform(){
    this.curDeg += 90;
  }
  ngOnInit() {
  }
  getPosition():Object{

      return{//返回当前组件可以到达的 行列位置
        endRow:'',
        endCol:''       
      }
  }
  animate(){
    setTimeout( () => {
      switch( this.curDeg % 360 ){
        case 0://初始状态
                let col= this.curLeft / 20 ,//二维数组下标从1开始，
                     row = this.curTop / 20 + 2 ;
                     try{
                      this.service.gameBox[0].forEach( item => {
                        if( item == 1 ){
                          throw new Error('游戏结束');
                          
                        }
                      })   
                     }catch(ex){
                      alert(ex);
                      return;
                     }
                if(this.service.gameBox[row] !== undefined && this.service.gameBox[row][col] == 0 && this.service.gameBox[row][col+1] == 0 &&  this.service.gameBox[row][col+2] == 0 ){
                    this.curTop += 20;
                    // this.animate()
                }else{
                
                  this.service.gameBox[row-1][col] = this.service.gameBox[row-1][col+1] =this.service.gameBox[row-1][col+2] = this.service.gameBox[row-2][col+1] = 1;
                  this.service.isAniFinshed.emit( true );
                }
                break;
        default:
                break;
        
      }
      // 
    },this.service.difficulty)
    console.log( this.service.difficulty )
  }
  handleMove(e){
    console.log(e)
  }
  handleClick(e){
    console.log(e)
  }
}
