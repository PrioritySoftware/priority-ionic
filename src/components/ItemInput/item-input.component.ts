import { Component, Input, HostListener, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { Form } from '../../entities/form.class';
import { Column } from '../../entities/column.class';
import { ColumnsOptions, ColumnOptions } from '../../entities/columnOptions.class';
import { FormService } from '../../services/form.service';
import { MessageHandler } from '../../popups/Message/message.handler';
import { Constants } from '../../constants.config';

@Component({
  selector: 'item-input',
  templateUrl: 'item-input.html',
  styleUrls: ['./item-input.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItemInput {

    @Input('Form') form: Form;
    @Input('Item') item;
    @Input('ColumnsOptions') columnsOptions : ColumnsOptions;

    @Output() columnClick = new EventEmitter<Column>();

    // Inorder to handle all the filed updates at one place,
    // we created a custom event handler listening for update events,
    // coming from different components and directives
    // such as the UpdateField directive, the ItemInputOpts component and more.
    // Usage: Emit an updatefield event as the following:
    // let event = new CustomEvent('updatefield', { detail: {value: value,
    //                                                       prevVal: prevVal,
    //                                                       field: filedname},
    //                                              bubbles: true});
    // and dispatch it to a nativeElement:
    // nativeElement.dispatchEvent(event);
    @HostListener('updatefield', ['$event']) update(event)
    {
        event = event.detail;
        this.updateField(event.field, event.value, event.prevVal);
    }

    dirByLang = Constants.dirByLang;
    validationMessages = {};
    // public member used to check if changes were made to the item values (that need save or discard).
    isDirty = false;

    constructor(private messageHandler: MessageHandler, private formService: FormService) {}

    // The displayed columns are sorted by the 'pos' option in columnOptions
    sort = (column1 : Column, column2: Column) =>
    {
        let columnOptions1 = this.getColumnOptions(column1);
        let columnOptions2 = this.getColumnOptions(column2);
        if (columnOptions1.pos > columnOptions2.pos)
        {
            return 1;
        }
        if (columnOptions2.pos > columnOptions1.pos)
        {
            return -1;
        }
        return 0;
    }

    // The displayed columns are only ones that have the 'isShow' option set to true in columnOptions.
    // By default this component displays all the column titles, not reffering to the 'isShowTitle' option
    // Returns if the column should be displayed
    isShowColumn = (column: Column) =>
    {
       let columnOptions = this.getColumnOptions(column);
       return columnOptions && columnOptions.isShow;
    }

    // Returns if column is date or time type
    isDateOrTimeColumn(column: Column)
    {
        return column.type == "date" || (column.type == "time" && column.maxLength == 5);
    }

    // Returns if column is boolean column
    isBoolColumn(column: Column)
    {
        return column.type == "bool";
    }

    // Returns the column direction according to it's type
    columnDirection(column: Column)
    {
        if (column.type == "number" || column.type == "time")
        {
            return "ltr"
        }
        return this.dirByLang;
    }

    // This method handles the updatefield event.
    // It sends the update field to the formService
    // Shows a transparent loading if the update takes more than 500ms
    // TODO: move the loading functionality outside of the package.
    // If the update returned with an error,
    // It sets the previous value back in the item, and updates the formService with it.
    updateField(columnName, value, prevVal, isUpdateAfterError = true)
    {
        if (columnName != null && prevVal != value)
        {
            let blockTimeout = setTimeout(() =>
            {
                this.messageHandler.showTransLoading();
            }, 500);
            this.formService.updateField(this.form, value, columnName).then(
                result =>
                {
                    this.isDirty = true;
                    clearTimeout(blockTimeout);
                    this.messageHandler.hideLoading();
                },
                error =>
                {
                    clearTimeout(blockTimeout);
                    this.messageHandler.hideLoading();
                    this.item[columnName] = prevVal;
                    if (isUpdateAfterError)
                    {
                        this.updateField(columnName, prevVal, prevVal, false);
                    }
                }
            );
        }
    }

    // Sets the validation message to be displayed in the validationMessages object
    displayValidationMessage(message,column: Column)
    {
        this.validationMessages[column.key] = message;
    }

    // Returns the input element type for the column
    getType(column: Column)
    {
        if (column.type == "number")
            return "text";
        return column.type;
    }

    // Returns if the column is readOnly
    isReadOnly(column: Column)
    {
        return this.form.isquery == 1 || column.readonly == 1;
    }

    // Returns the column's value
    getValue(column: Column)
    {
        if (this.item[column.key] == null)
            return "";
        return this.item[column.key];
    }

    // Return the columnOptions for the given column.
    getColumnOptions(column: Column): ColumnOptions
    {
        return this.columnsOptions[column.key];
    }

    // Handles the icon click
    iconClicked($event,column : Column)
    {
        let columnOptions = this.getColumnOptions(column);
        // if there is a 'click' option form that column, invoke it
        if (columnOptions && columnOptions.click)
        {
            columnOptions.click($event,column,this.item);
        }
        // otherwise, emit the columnClick event with the column clicked.
        else
        {
            this.columnClick.emit(column);
        }
    }

}
