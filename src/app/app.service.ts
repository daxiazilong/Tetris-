import{Injectable,EventEmitter } from '@angular/core';
@Injectable()
export class appService {
    public difficulty:number = 200;//游戏难度
    public isAniFinshed: EventEmitter<boolean>;
    public gameBox = (() => {
        var gameBox = [];
        for( let i = 0; i < 25; i++){//将游戏框看成一个 25 *10的二维数组
            gameBox[i] = []; 
          for(let j = 0; j < 10; j++){
            gameBox[i][j] = 0;//初始盒子内无内容，则为0；
          }
        }
        return gameBox;
    })()
    public scores :number = 0;
    constructor(){
        this.isAniFinshed = new EventEmitter();
    }
}