import { Component, Input, ElementRef, ViewEncapsulation } from '@angular/core';
import { Constants } from '../../constants.config'
import * as moment from "moment";

@Component({
    selector: 'date-time',
    template: `<div class="datetime" dir={{dirByLang}}>
                   <ion-label [ngClass]="{disabled : getIsReadOnly()}"
                   >{{formatedValue}}</ion-label>
                   <ion-icon name="{{getIconName()}}"></ion-icon>
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

    @Input('column') column;
    @Input() set value(value) {
        //we could add here default date (of today) for empty fields
        //but needs to have a flag if set default date or not
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
    constructor(private elRef:ElementRef) {
        this.formatedValue = "";
        this.strValue = "";
    }

    dateToISO(date : Date) {
        return date.toISOString();
    }

    isoToString(ios) {
        if(this.column.maxLength == 14)
            return ios.substring(0,16);
        return ios.substring(0,10);
    }

    updateField(value) {
        let event = new CustomEvent('updatefield', { detail: {value: value,
                                                              prevVal: this.strValue,
                                                              field: this.column.name},
                                                     bubbles: true});
        this.elRef.nativeElement.dispatchEvent(event);
    }

    dateChanged(event) {
        let value = event.target.value;
        if(this.column.type == "date" && value != "") {
            var date = new Date(value);
            this.updateField(this.dateToISO(date));
        }
        else {
            this.updateField(value);
        }    
    }

    getDateType() {
        if(this.column.type == "date") {
            if(this.column.maxLength == 14) 
                return "datetime-local";
            return "date";
        }
        else {
            return "time";
        }
    }

    getIconName() {
        if(this.column.type == "date")
            return "calendar";
        return "time";
    }

    getIsReadOnly() {
        return this.column.readonly == 1;
    }
}