import { Component, OnInit } from '@angular/core';
import { CommonMethods } from '../interface/common';
import { DomSanitizer } from '@angular/platform-browser';

import { appService } from '../app.service';
@Component({
  selector: 'app-shape-yi',
  templateUrl: './shape-yi.component.html',
  styleUrls: ['./shape-yi.component.css']
})
export class ShapeYi implements OnInit,CommonMethods {
  private curTop:number = 0;
  private curLeft: number = 0;
  private curDeg: number = 0;

  private isFinish: boolean = false;

  private transformString;
  constructor(private sanitizer: DomSanitizer,public service: appService) { }



  ngOnInit() {
  }
  transform(){
    if( this.isFinish ){
      return;
    }
    let curRow = this.curTop / 20,
        curCol = this.curLeft / 20;
    let transformString = '';
    this.curDeg += 90;
    switch( this.curDeg % 360 ){
        case 0:
        case 180:
                  if(
                    this.service.gameBox[curRow][curCol] === 0 &&
                    this.service.gameBox[curRow][ curCol + 1 ] === 0 &&
                    this.service.gameBox[curRow][ curCol + 2 ] ===0 &&
                    this.service.gameBox[curRow][ curCol + 3 ] ===0
                  ){
                    if(
                      this.service.gameBox[curRow][curCol + 3 ] === undefined//已到达右边界
                                        ||
                      0
                    ){
                      this.curLeft = 120;
                      transformString = " rotateZ(" + this.curDeg +"deg) translate3d(0,0,0)";
                    }else{
                      transformString = " rotateZ(" + this.curDeg +"deg) translate3d(0,0,0)"
                    }
                  }else{
                    this.curDeg -= 90;
                    return;
                  }
                  
                  break;
        case 90:
                  if(//这是用来判断当前空间内是否能容纳旋转后的元素的
                    this.service.gameBox[curRow+3] &&
                    this.service.gameBox[curRow][curCol] === 0 &&
                    this.service.gameBox[curRow+1][curCol] === 0 &&
                    this.service.gameBox[curRow+2][curCol] === 0 &&
                    this.service.gameBox[curRow+3][curCol] === 0
                  ){
                      if( this.service.gameBox[curRow+3] === undefined ){//已达最下界,可以处理的
                        // this.curTop = 420    这种处理方法很有可能会造成死循环
                        // transformString = " rotateZ(" + this.curDeg +"deg) translate3d(30px,30px,0)";
                        return;
                        }else{
                          transformString = " rotateZ(" + this.curDeg +"deg) translate3d(30px,30px,0)";
                        }
                    }else{
                      this.curDeg -= 90;
                      return;
                    }
                  break;
        case 270:
                  if(//这是用来判断当前空间内是否能容纳旋转后的元素的
                    this.service.gameBox[curRow+3] && 
                    this.service.gameBox[curRow][curCol] === 0 &&
                    this.service.gameBox[curRow+1][curCol] === 0 &&
                    this.service.gameBox[curRow+2][curCol] === 0 &&
                    this.service.gameBox[curRow+3][curCol] === 0
                  ){
                      if( this.service.gameBox[curRow+3] === undefined ){//已达最下界
                        // this.curTop = 420
                        // transformString = " rotateZ(" + this.curDeg +"deg) translate3d(30px,30px,0)";
                        this.curDeg -= 90;
                        return;
                      }else{
                          transformString = " rotateZ(" + this.curDeg +"deg) translate3d(-30px,-30px,0)";
                      }
                  }else{
                    this.curDeg -= 90;
                    return;
                  }
                  break;
        default:break;
    }
    this.transformString = this.sanitizer.bypassSecurityTrustStyle( transformString );
  }
  animate(isFinish: boolean = false){
    this.isFinish = isFinish ;
    setTimeout(() => {
      let curRow = this.curTop / 20,
      curCol = this.curLeft / 20;
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
      switch( this.curDeg % 360 ){
        case 0:
        case 180:
                  if(
                    this.service.gameBox[curRow + 1 ] &&
                    this.service.gameBox[curRow + 1 ]&&
                    this.service.gameBox[curRow + 1][curCol] === 0 &&
                    this.service.gameBox[curRow + 1][curCol+1] === 0 &&
                    this.service.gameBox[curRow + 1][curCol+2] === 0 &&
                    this.service.gameBox[curRow + 1][curCol+3] === 0
                  ){
                    this.curTop += 20;
                    this.animate();
                  }else{
                    if(!isFinish){
                      this.animate(true);//到达底部时留一个操作的时间
                      return;
                    }
                    this.service.gameBox[curRow][curCol] = 
                      this.service.gameBox[curRow][curCol+1] = 
                        this.service.gameBox[curRow][curCol+2] = 
                        this.service.gameBox[curRow][curCol+3] = 1;

                    this.service.isAniFinshed.emit( true );
                  }
                  break;
        case 90:
        case 270:
                  if( this.service.gameBox[curRow + 4 ] && this.service.gameBox[curRow + 4 ][ curCol ] ===0 ){
                    this.curTop += 20;
                    this.animate();
                  }else{
                    if(!isFinish){
                      this.animate(true);//到达底部时留一个操作的时间
                      return;
                    }
                    this.service.gameBox[curRow][curCol] = this.service.gameBox[curRow+1][curCol] = this.service.gameBox[curRow+2][curCol] = this.service.gameBox[curRow+3][curCol] = 1;
                    this.service.isAniFinshed.emit( true );
                  }
                  break;
        default:break;
      }
    },this.service.difficulty)
    
  }
  moveLeft(){
    let curRow = this.curTop / 20,
        curCol = this.curLeft / 20;
        if( curCol > 0 ){
          switch( this.curDeg % 360 ){
            case 0:
            case 180:
                      if(
                        this.service.gameBox[curRow] &&
                        this.service.gameBox[curRow][curCol - 1] === 0
                      ){
                        this.curLeft -= 20;
                      }
                      break;
            case 90:
            case 270:
                      if(
                          this.service.gameBox[curRow + 3] &&
                          this.service.gameBox[curRow][curCol - 1] ===0 &&
                          this.service.gameBox[curRow + 1][ curCol-1 ] === 0 &&
                          this.service.gameBox[curRow + 2][curCol - 1] === 0 &&
                          this.service.gameBox[curRow + 3][curCol - 1] === 0
                      ){
                        this.curLeft -= 20;
                      }
                      break;
            default:break;
          }
        }
        
  }
  moveRight(){
    let curRow = this.curTop / 20,
        curCol = this.curLeft / 20;
    
          switch( this.curDeg % 360 ){
            case 0:
            case 180:
                      if( curCol < 6 ){
                          if(
                            this.service.gameBox[curRow][curCol + 1] === 0 &&
                            this.service.gameBox[curRow][curCol + 2] === 0 &&
                            this.service.gameBox[curRow][curCol + 3] === 0 &&
                            this.service.gameBox[curRow][curCol + 4] === 0  
                          ){
                            this.curLeft += 20;
                          }
                      }
                      break;
            case 90:
            case 270:
                      if( curCol < 9){
                          if(
                            this.service.gameBox[curRow + 3] &&
                            this.service.gameBox[curRow][curCol + 1] ===0 &&
                            this.service.gameBox[curRow + 1][ curCol+1 ] === 0 &&
                            this.service.gameBox[curRow + 2][curCol + 1] === 0 &&
                            this.service.gameBox[curRow + 3][curCol + 1] === 0
                        ){
                          this.curLeft += 20;
                        }
                      }
                        
                      break;
            default:break;
          }
  }
  speedUp(){
    let curRow = this.curTop / 20,
        curCol = this.curLeft / 20;
    
        switch( this.curDeg % 360 ){
          case 0:
          case 180:
                    if( curRow < 25 ){
                      if(
                        this.service.gameBox[curRow + 1 ] &&
                        this.service.gameBox[curRow + 1 ]&&
                        this.service.gameBox[curRow + 1][curCol] === 0 &&
                        this.service.gameBox[curRow + 1][curCol+1] === 0 &&
                        this.service.gameBox[curRow + 1][curCol+2] === 0 &&
                        this.service.gameBox[curRow + 1][curCol+3] === 0
                      ){
                        this.curTop += 20;
                      }
                    }
                    break;
          case 90:
          case 270:
                    if( curRow + 4 < 25){
                      if(
                        this.service.gameBox[curRow + 1 ][curCol] ===0 &&
                        this.service.gameBox[curRow + 2 ][curCol] ===0 &&
                        this.service.gameBox[curRow + 3 ][curCol] ===0 &&
                        this.service.gameBox[curRow + 4 ][curCol] ===0

                    ){
                      this.curTop += 20;
                    }
                    }
                      
                    break;
          default:break;
        }
  }
  
}
