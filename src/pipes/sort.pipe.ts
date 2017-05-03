import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'Sort',
  pure: false
})
@Injectable()
export class SortPipe implements PipeTransform {
  transform(items: any[], f, param): any {
    return items.sort((item1,item2)=> f(item1,item2,param));
  }
}