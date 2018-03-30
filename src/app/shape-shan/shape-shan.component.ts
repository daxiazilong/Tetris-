import { Component, OnInit, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
  private transformString;
  constructor(public service: appService, private sanitizer: DomSanitizer) { 
    this.transformString = sanitizer.bypassSecurityTrustStyle( this.transformString)
   }
  transform(){
    let nextRow:number; //this.curTop / 20 + 4;
    let curRow = this.curTop /20 ,curCol = this.curLeft / 20;
    this.curDeg += 90;
    let transformStr:string;
    switch( this.curDeg % 360){
      case 0:
            nextRow = this.curTop / 20 + 3
            if( !this.service.gameBox[nextRow] ){//在下面几行变形的时候会产生bug，简单粗暴的防止；
              this.curDeg -= 90;
              return;
            }

            if(
              this.service.gameBox[curRow][curCol+2] !== undefined && // 90度和270度开始旋转的时候如果到达边界就会出现bug 故而有这条语句
              this.service.gameBox[curRow][curCol + 1 ] !==1 &&
              this.service.gameBox[curRow ][curCol] !==1 &&
              this.service.gameBox[curRow][curCol + 1] !== 1 &&
              this.service.gameBox[curRow][curCol+2] !==1
            ){
              transformStr = "rotateZ(" + this.curDeg + "deg) translate3d(0,0,0)";
            }else{
              this.curDeg -= 90;
              return;
            }
              
              break;
      case 90:
              nextRow = this.curTop / 20 + 2;// 90度之前为0度的形状，180之前为90的形状以处理bug，依次类推
              if( !this.service.gameBox[nextRow] ){//在下面几行变形的时候会产生bug，简单粗暴的防止；
                this.curDeg -= 90;
                return;
              }
              if( 
                  this.service.gameBox[curRow][curCol] !==1 &&
                  this.service.gameBox[curRow + 1][curCol] !==1 &&
                  this.service.gameBox[curRow + 1][curCol + 1] !== 1 &&
                  this.service.gameBox[curRow + 2][curCol] !==1
                ){
                  transformStr = "rotateZ(" + this.curDeg + "deg) translate3d(0,20px,0)";
                }else{
                  this.curDeg -= 90;
                  return;
                }
              
              break;
      case 180:
              nextRow = this.curTop / 20 + 3
              if( !this.service.gameBox[nextRow] ){//在下面几行变形的时候会产生bug，简单粗暴的防止；
                this.curDeg -= 90;
                return;
              }
              if(
                (this.service.gameBox[curRow][curCol + 2] !== undefined) &&
                this.service.gameBox[curRow][curCol] !==1 &&
                this.service.gameBox[curRow ][curCol + 1] !==1 &&
                this.service.gameBox[curRow][curCol + 2] !== 1 &&
                this.service.gameBox[curRow + 1][curCol+1] !==1
              ){
                transformStr = "rotateZ(" + this.curDeg + "deg) translate3d(0px,20px,0)";
              }else{
                this.curDeg -= 90;
                return;
              }            
              break;
      case 270:
              nextRow = this.curTop / 20 + 2;// 90度之前为0度的形状，180之前为90的形状以处理bug，依次类推
              if( !this.service.gameBox[nextRow] ){//在下面几行变形的时候会产生bug，简单粗暴的防止；
                this.curDeg -= 90;
                return;
              }
              if(
                this.service.gameBox[curRow][curCol + 1 ] !==1 &&
                this.service.gameBox[curRow + 1 ][curCol + 1] !==1 &&
                this.service.gameBox[curRow + 1 ][curCol + 1] !== 1 &&
                this.service.gameBox[curRow + 2][curCol+1] !==1
              ){
                transformStr = "rotateZ(" + this.curDeg + "deg) translate3d(0,0,0)";
              }else{
                this.curDeg -= 90;
                return;
              }
              
              break;
      default: break;
    }
    // 如果不使用下面这个方法ng会认为这是一个具有攻击性的字符串 而使样式不予显示
    this.transformString = this.sanitizer.bypassSecurityTrustStyle(transformStr);
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
      let col,row;

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
        case 0://初始状态
                 col= this.curLeft / 20 ;
                 row = this.curTop / 20 + 2 ;
                     
                if(this.service.gameBox[row] !== undefined && this.service.gameBox[row][col] == 0 && this.service.gameBox[row][col+1] == 0 &&  this.service.gameBox[row][col+2] == 0 ){
                    this.curTop += 20;
                    this.animate()
                }else{
                
                  this.service.gameBox[row-1][col] = this.service.gameBox[row-1][col+1] =this.service.gameBox[row-1][col+2] = this.service.gameBox[row-2][col+1] = 1;
                  this.service.isAniFinshed.emit( true );
                }
                break;
        case 90://90 度旋转后的下落，后同
                col = this.curLeft / 20;
                row = this.curTop / 20;
                if( this.service.gameBox[row+3] && 
                  this.service.gameBox[row+3][col] == 0 &&
                   this.service.gameBox[row+2][col+1] == 0  ){
                  this.curTop += 20;
                  this.animate()
                }else{
                  console.log( this.service.gameBox[row+1][col+2] == 0 )
                  this.service.gameBox[row][col] = this.service.gameBox[row+1][col] = this.service.gameBox[row+1][col+1] = this.service.gameBox[row+2][col] = 1
                  this.service.isAniFinshed.emit( true );
                 
                }
                break;
        case 180:
                col = this.curLeft / 20;
                row = this.curTop / 20; 
                if( this.service.gameBox[row + 2 ] &&
                    this.service.gameBox[row+1][col] == 0 &&
                    this.service.gameBox[row+2][col+1] == 0 &&
                    this.service.gameBox[row+1][col+2] == 0
                ){
                  this.curTop += 20;
                  this.animate()
                }else{
                    this.service.gameBox[row][col] = this.service.gameBox[row][col+1] = this.service.gameBox[row][col+2] = this.service.gameBox[row+1][col+1] = 1
                    this.service.isAniFinshed.emit( true );
                }
                break;
        case 270:
                col = this.curLeft / 20;
                row = this.curTop / 20;
                if(
                  this.service.gameBox[row + 3] &&
                  this.service.gameBox[row + 2 ][col] !== 1 &&
                  this.service.gameBox[row+3][col+1] !==1
                ){
                  this.curTop += 20;
                  this.animate()
                }else{
                  this.service.gameBox[row][col+1] = this.service.gameBox[row+1][col] = this.service.gameBox[row+1][col+1] = this.service.gameBox[row+2][col+1] = 1
                  this.service.isAniFinshed.emit( true );
                }
                break;
        default:
                break;
        
      }
      // 
    },this.service.difficulty)
  }
  moveRight(){
    let curCol = this.curLeft / 20,
        curRow = this.curTop / 20;

    switch( this.curDeg % 360 ){
      case 0://形状1
            if( curCol < 7 ){//没有到达右边界
                if( 
                    this.service.gameBox[curRow + 1 ][curCol + 4] !==1 &&
                    this.service.gameBox[curRow][curCol + 2] !==1
                  ){//保证他的右边没有其他盒子
                    this.curLeft += 20
                }
                    
            }

              break;
      case 90://顺时针旋转90后
              if( curCol < 8 ){//同上
                if(
                  this.service.gameBox[curRow][curCol + 1] !== 1 &&
                  this.service.gameBox[curRow + 1 ][curCol +2] !==1 &&
                  this.service.gameBox[curRow + 2][curCol + 1] !==1
                ){
                  this.curLeft += 20
                }
              }
              break;  
      case 180:
              if( curCol < 7 ){
                if( 
                    this.service.gameBox[curRow][curCol+3] !==1 &&
                    this.service.gameBox[curRow+1][curCol+2] !==1

                   ){
                    this.curLeft += 20
                }
              }
              break;
      case 270:
              if( curCol < 8 ){
                  if(
                    this.service.gameBox[curRow][curCol+2] !== 1 &&
                    this.service.gameBox[curRow+1][curCol+2] !== 1 &&
                    this.service.gameBox[curRow+2][curCol+2] !== 1 
                  ){
                    this.curLeft += 20
                  }
              }
                
              break;
      default:
              break;
    }
  }
  moveLeft(){
    let curCol = this.curLeft / 20,
        curRow = this.curTop / 20;
      if( curCol > 0 ){//没有到达左边界
        switch (this.curDeg % 360){
          case 0:               
                  if( this.service.gameBox[curRow + 1][ curCol - 1 ] !== 1 && this.service.gameBox[curRow][ curCol - 2 ] !== 1 ){//保证他的左边边没有其他盒子
                      this.curLeft -= 20;
                  } 
                  console.log(this.service.gameBox)                
                  break;
          case 90:
                  if(
                    this.service.gameBox[curRow][curCol-1] !==1 && 
                    this.service.gameBox[curRow+1][curCol - 1 ] !== 1 &&
                    this.service.gameBox[curRow+2][curCol - 1 ] !== 1
                  ){
                    this.curLeft -= 20;
                  }
                  break;
          case 180:
                  if(
                    this.service.gameBox[curRow][curCol-1] !==1 &&
                    this.service.gameBox[curRow][curCol-1] !==1 
                  ){
                    this.curLeft -= 20;
                  }
                  break;
          case 270:
                  if(
                    this.service.gameBox[curRow][curCol] !==1 &&
                    this.service.gameBox[curRow + 1 ][ curCol -1 ] !== 1&&
                    this.service.gameBox[curRow + 2 ][curCol] !==1
                  ){
                    this.curLeft -= 20;
                  }
                  break;
                
        }
    }
  }
}
