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
  private curTop:number = 0;
  private curLeft: number = 0;
  private curDeg: number = 0;
  private transformString;
  constructor(private sanitizer: DomSanitizer,public service: appService) { }

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
    console.log(transformString);
    this.transformString = this.sanitizer.bypassSecurityTrustStyle( transformString );
  }
  animate(){
    
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
      
  }
