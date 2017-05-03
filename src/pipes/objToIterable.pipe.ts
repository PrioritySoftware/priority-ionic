import {Pipe,PipeTransform} from '@angular/core';

@Pipe({
    name: 'objToIterable'
})
export class ObjToIterable implements PipeTransform 
{
    transform(obj: Object, args: any[] = null): Array<any>
    {
        if (!obj)
            return null;
        return Object.keys(obj).map((key) => { 
        	let item = obj[key];
        	item.key = key;
        	return item;
        });
    }
}