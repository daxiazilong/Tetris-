import { Component, OnInit } from '@angular/core';
import { CommonMethods } from '../interface/common';
import { DomSanitizer } from '@angular/platform-browser';

import { appService } from '../app.service';
@Component({
  selector: 'app-shape-zhi',
  templateUrl: './shape-zhi.component.html',
  styleUrls: ['./shape-zhi.component.css']
})
export class ShapeZhiComponent implements OnInit,CommonMethods {
  public curTop:number = 0;
  public curLeft: number = 0;
  public curDeg: number = 0;
  public transformString;
  constructor(public sanitizer: DomSanitizer,public service: appService) { }

  ngOnInit() {
  }
  transform(){
    let curRow = this.curTop / 20,
        curCol = this.curLeft / 20,
        transformString = '';
        this.curDeg += 90;
    switch( this.curDeg % 360 ){
      case 0:
      case 180:
              if(
                this.service.gameBox[curRow][curCol] !== 1 &&
                this.service.gameBox[curRow][curCol + 1 ] !== 1 &&
                this.service.gameBox[curRow + 1][curCol + 1] !==1 &&
                this.service.gameBox[ curRow +1 ] [ curCol + 2 ] !== 1 
              ){//有空间才允许变形
                if(this.service.gameBox[curRow][curCol + 2] === undefined ){//变形前看看他是不是 已经到边界了,180和0度之前的形态 是 90 或 270 的形态
                  transformString = "rotateZ(" + this.curDeg + "deg) translate3d( 0px, 0px, 0px)"; 
                  this.curLeft -= 20;
                }else{
                  transformString = "rotateZ(" + this.curDeg + "deg) translate3d( 0px, 0px, 0px)";  
                }
              }       
                
              break;
      case 90:
              transformString = "rotateZ(" + this.curDeg + "deg) translate3d(10px, 10px, 0px)";
              break;
      // case 180:
      //         transformString = "rotateZ(" + this.curDeg + "deg) translate3d(0px, 0px, 0px)";
      //         break;
      case 270:
              transformString = "rotateZ(" + this.curDeg + "deg) translate3d(-10px, -10px, 0px)";
              break;
      default:
              break;
    }
    this.transformString = this.sanitizer.bypassSecurityTrustStyle( transformString );
  }
  animate(){
   
        setTimeout( () => {
          let curRow = this.curTop / 20,//当前行和列只能在这个时间线上取，否则会产生异步错误，时光倒流 -.- 
          curCol = this.curLeft / 20
          try{//判断是否已经堆积到最顶了
            this.service.gameBox[0].forEach( item => {
              if( item == 1 ){
                throw new Error('游戏结束');               
              }
          })   
         }catch(ex){
            alert(ex);
            return;
         }
       
          switch(this.curDeg % 360){
            case 0:
            case 180:
                      if(
                        this.service.gameBox[ curRow + 2] &&
                        this.service.gameBox[curRow + 1][curCol] === 0 &&
                        this.service.gameBox[ curRow + 2][ curCol + 1 ] === 0 &&
                        this.service.gameBox[ curRow + 2][ curCol + 2 ] === 0
                      ){
                        this.curTop += 20;
                        this.animate();
                      }else{
                        this.service.gameBox[curRow][curCol] =  this.service.gameBox[curRow][curCol + 1] =  this.service.gameBox[curRow + 1 ][curCol + 1] =  this.service.gameBox[curRow + 1 ][curCol + 2] = 1;
                        this.service.isAniFinshed.emit( true );
                      }
                      break;
            case 90:
            case 270:
                      if(
                        this.service.gameBox[curRow + 3] &&//主要是为了防止当落到底部时 数组越界访问，造成的error,其他处代码类似
                        this.service.gameBox[curRow + 3][ curCol ] === 0 &&
                        this.service.gameBox[curRow + 2][ curCol+1 ] === 0
                      ){
                        this.curTop += 20;
                        this.animate();
                      }else{
                        this.service.gameBox[curRow][curCol+1] =  this.service.gameBox[curRow+1][curCol] = this.service.gameBox[curRow+1][curCol+1] = this.service.gameBox[curRow+2][curCol] = 1;
                        this.service.isAniFinshed.emit( true );
                      }
                      break;
            default:break;
          }
        } , this.service.difficulty)
          
  }
  moveLeft(){//之字形 旋转状态只有两种，故而采用如下的switch case语句
    let curRow = this.curTop / 20,
        curCol = this.curLeft / 20;
    if( curCol > 0 ){
        switch( this.curDeg % 360 ){
            case 0:
            case 180:
                  if(
                    this.service.gameBox[curRow][curCol-1] !==1 &&
                    this.service.gameBox[curRow + 1][curCol] !==1
                  ){
                    this.curLeft -= 20
                  }
                  break;
            case 90:
            case 270:
                  if(
                    this.service.gameBox[curRow][curCol] !== 1 &&
                    this.service.gameBox[curRow + 1 ][ curCol - 1 ] !== 1 &&
                    this.service.gameBox[curRow + 2 ][curCol -1 ] !== 1 
                  ){
                    this.curLeft -= 20
                  }
                  break;
            default:break;
        }
    }
  }
  moveRight(){
    let curRow = this.curTop / 20,
        curCol = this.curLeft / 20;
        switch(this.curDeg % 360){
            case 0:
            case 180:
                      if(curCol < 7){
                        if( 
                          this.service.gameBox[ curRow ][ curCol + 2 ] !== 1 &&
                          this.service.gameBox[ curRow +1 ][ curCol + 3 ] !== 1
                         ){
                          this.curLeft += 20;
                        }
                      }
                      break;
            case 90:
            case 270:
                      if( curCol < 8 ){
                        if(
                          this.service.gameBox[ curRow ][ curCol + 2 ] !== 1 &&
                          this.service.gameBox[ curRow + 1 ][ curCol + 2] !==1 &&
                          this.service.gameBox[ curRow + 2 ][ curCol +1 ] !==1
                        ){
                          this.curLeft += 20
                        }
                      }

                      break;
        }
  }
  speedUp(){}
      
  }
