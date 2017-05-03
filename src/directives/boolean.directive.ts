import { Directive, OnInit } from '@angular/core';
import { DefaultValueAccessor, NgModel } from '@angular/forms';

@Directive({
  selector: '[boolean][ngModel]', // Attribute selector
  providers: [DefaultValueAccessor]
})
//This directive is for boolean fileds
export class BooleanDirective implements OnInit
{

  constructor(private model: NgModel) { }

  valueChange(value)
  {
    // change value to 'Y' and 'N' for boolean
    if (value !== null && value !== undefined)
    {
      if (typeof value === 'string')
      {
        let val = value == 'Y' ? true : false;
        this.model.valueAccessor.writeValue(val);
      }
      else
      {
        let val = value ? 'Y' : 'N';
        this.model.viewToModelUpdate(val);
        this.model.valueAccessor.writeValue(val);
      }
    }
  }

  ngOnInit()
  {
    this.model.valueChanges.subscribe(
      (value: any) => 
      {
        this.valueChange(value);
      });
  }
}