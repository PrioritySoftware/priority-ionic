import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { DefaultValueAccessor, NgModel } from '@angular/forms';
import { FormService } from "../services/form.service";

@Directive({
    selector: '[update-field]',
    providers: [DefaultValueAccessor]
})
export class UpdateFieldDirective 
{
    prevVal;
    @Input('update-field') column;

    constructor(private model: NgModel,private elRef:ElementRef,private formService : FormService) {
    }

    updateField(value) {
        let event = new CustomEvent('updatefield', { detail: {value: value,
                                                              prevVal: this.prevVal,
                                                              field: this.column.key},
                                                     bubbles: true});
        this.elRef.nativeElement.dispatchEvent(event);
    }


    @HostListener('ionFocus') onfocus()
    {
       //save the current value before changes
       this.prevVal = this.model['viewModel'];
    }
    
    @HostListener('ionBlur') onBlur()
    {
        if(this.prevVal !== this.model['viewModel'])
        {
           this.updateField(this.model['viewModel']); 
        }
    }

    @HostListener('ionChange') onionchange()
    {
        if(this.column.type == "bool") {
            if(typeof this.model.value == 'boolean') {
                this.updateField(this.model.viewModel);
            }
        }
        
    }


}