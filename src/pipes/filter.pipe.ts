import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'Filter',
  pure: false
})
@Injectable()
export class FilterPipe implements PipeTransform {
  transform(items: any[], f, param): any {
    return items.filter(column => f(column,param));
  }
}