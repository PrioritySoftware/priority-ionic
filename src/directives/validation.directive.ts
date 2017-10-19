import { Directive, ElementRef, Renderer, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DefaultValueAccessor, NgControl } from '@angular/forms';
import { DecimalPipe } from "@angular/common";
import { Constants } from '../constants.config';
import * as VMasker from "vanilla-masker";
import * as numeral from "numeral";

const DurationMaskLength: number = 5;
const Mask: string = '999:99';

@Directive({
  selector: '[validation][ngModel]', // Attribute selector
  providers: [DefaultValueAccessor]
})
//This directive is for handling validation for text fields
export class ValidationDirective implements OnInit
{
  constructor(private renderer: Renderer,
    private elementRef: ElementRef,
    private model: NgControl) { }

  @Input('validation') column;
  @Output() validationMessage = new EventEmitter<String>();

  numberDecimal()
  {
    return '.' + 0 + '-' + this.column.decimal;
  }

  //validation for number fields
  numberChange(value)
  {
    // prevent user to input non-digit characters while typing
    // and limit user input to column's max length
    // and limit user decimal input to column's deciaml
    if (value !== null && value !== undefined)
    {
      let inputElem = this.elementRef.nativeElement.querySelector('input');
      let caretPos = inputElem.selectionStart;
      let numOfCommas = (value.match(/,/g) || []).length;

      let val = value.replace(/[^0-9.]/g, '');
      val = val.substring(0, this.column.maxLength);

      if (val != "" && val[val.length - 1] != ".")
      {
        val = numeral(val)._value;
        let decimalPipe = new DecimalPipe(window.navigator.language);
        val = decimalPipe.transform(val, this.numberDecimal());
      }

      this.model.valueAccessor.writeValue(val);
      this.renderer.setElementProperty(inputElem, 'value', val);
      this.model.viewToModelUpdate(val);

      //fix for the caret bug - caret was moving backwards one place when a comma has been added.
      let newNumOfCommas = (val.match(/,/g) || []).length;
      if (newNumOfCommas != numOfCommas)
      {
        setTimeout(() =>
        {
          let pos = newNumOfCommas > numOfCommas ? caretPos+1 : caretPos - 1;
          inputElem.setSelectionRange(pos, pos);
        }, 0);
      }


    }
  }

  writeDuration(value: any): void
  {
    // Write to view        
    if (value !== null && value !== undefined)
    {

      value = VMasker.toPattern(value, Mask);

      this.model.valueAccessor.writeValue(value);
      this.renderer.setElementProperty(this.elementRef.nativeElement.querySelector('input'), 'value', value);
    }
  }

  //validation for duration fields
  durationChange(value)
  {
    // prevent user to input non-digit characters while typing
    // and limit user input to CardMaskLength characters
    if (value !== null && value !== undefined)
    {
      let val = value.replace(/\D/g, '');
      if (val[3] >= 6)
      {
        val = val.substring(0, 3)
      }
      val = val.substring(0, DurationMaskLength);

      //write formatted to control view
      this.writeDuration(val);

      this.model.viewToModelUpdate(val);
    }
  }

  //validation for text fields
  valueChange(value)
  {
    if (value !== null && value !== undefined)
    {
      //limit user input to column's max length
      let val = value.substring(0, this.column.maxLength);

      //show err message for 2 seconds
      if (value.length > this.column.maxLength)
      {
        this.validationMessage.emit(Constants.lengthValidErr + this.column.maxLength);
        setTimeout(() => { this.validationMessage.emit(""); }, 2000);
      }

      this.model.valueAccessor.writeValue(val);
      this.renderer.setElementProperty(this.elementRef.nativeElement.querySelector('input'), 'value', val);

      this.model.viewToModelUpdate(val);
    }
  }

  ngOnInit()
  {
    this.model.valueChanges.subscribe((value: any) =>
    {
      switch (this.column.type)
      {
        case "time":
          this.durationChange(value);
          break;
        case "number":
          this.numberChange(value);
          break;
        default:
          this.valueChange(value);
          break;
      }
    });
  }
}