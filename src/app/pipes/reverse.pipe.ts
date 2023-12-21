import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  transform(ch: string): string {
    let newCh="";
    // for (let i = 0; i < ch.length; i++) {
    //   newCh=ch[i]+newCh;  
    // }
    for (let i = ch.length-1; i>=0; i--) {
      newCh=newCh + ch[i]; 
    }
    return newCh;
  }

}
