import { Component, Input, ElementRef, ViewEncapsulation } from '@angular/core';
import { Constants } from '../../constants.config'
import * as moment from "moment";

@Component({
    selector: 'date-time',
    template: `<div class="datetime" dir={{dirByLang}} [ngClass]="{disabled : getIsReadOnly()}">
                   <ion-label>{{formatedValue}}</ion-label>
                   <ion-icon *ngIf="!getIsReadOnly()" name="{{getIconName()}}"></ion-icon>
                   <input
                        [value]="strValue"
                        type="{{getDateType()}}"
                        (change)="dateChanged($event)"
                        [readonly]="getIsReadOnly()"/>
               </div>`,
    styleUrls: ['./date-time.scss'],
    encapsulation: ViewEncapsulation.None
})

export class DateTimeField
{
    formatedValue;
    strValue;
    dirByLang = Constants.dirByLang;

    @Input('form') form;
    @Input('column') column;
    @Input() set value(value)
    {
        //we could add here default date (of today) for empty fields
        //but needs to have a flag if set default date or not
        this.setValue(value);
    }
    constructor(private elRef:ElementRef)
    {
        this.formatedValue = "";
        this.strValue = "";
    }

    setValue(value)
    {
        if(value == "") {
            this.strValue = value;
            this.formatedValue = value;
        }
        else if(value !== null && value !== undefined) {
            this.strValue = this.isoToString(value);
            if(this.column.type == "date") {
                this.formatedValue = moment.utc(value).format(this.column.format);
            }
            else {
                this.formatedValue = moment(value,"HH:mm").format(this.column.format);
            }
        }
    }

    dateToISO(date : Date)
    {
        return date.toISOString();
    }

    isoToString(ios)
    {
        if(this.column.maxLength == 14)
            return ios.substring(0,16);
        return ios.substring(0,10);
    }

    updateField(prevVal,value)
    {
        let event = new CustomEvent('updatefield', { detail: {value: value,
                                                              prevVal: prevVal,
                                                              field: this.column.key},
                                                     bubbles: true});
        this.elRef.nativeElement.dispatchEvent(event);
    }

    dateChanged(event)
    {
        let value = event.target.value;
        let prevVal = this.strValue;
        if(this.column.type == "date" && value != "")
        {
            let date = new Date(value);
            let dateValue = this.dateToISO(date);
            this.setValue(dateValue);
            this.updateField(prevVal,dateValue);
        }
        else
        {
            this.setValue(value);
            this.updateField(prevVal,value);
        }    
    }

    getDateType()
    {
        if(this.column.type == "date") {
            if(this.column.maxLength == 14) 
                return "datetime-local";
            return "date";
        }
        else {
            return "time";
        }
    }

    getIconName()
    {
        if(this.column.type == "date")
            return "calendar";
        return "time";
    }

    getIsReadOnly()
    { 
        return this.column.readonly == 1 || (this.form && this.form.isquery == 1);
    }
}