import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Constants } from '../../constants.config';
import {ColumnOptions} from'../../entities/columnOptions.class';
import { FormService } from '../../services/form.service';
import * as moment from 'moment';

@Component({
    selector: 'item-details',
    templateUrl: 'item-details.html',
    styleUrls: ['./item-details.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ItemDetails
{
    /**
     * This component is used to display a single 'Priority Row' here called 'Item'.
     * Inputs:
     * 'Form' - The form object (returned by the api with startForm) of the row to diplay.
     * 'Item' - The row to display
     * The 'Form' columns titles are displayed with the column's value according to the properties set in each 'Column' object in 'form.columns'.
     * (If you're using 'FormService' you could init your column's properties with 'initForm' and these will automatically be passed to this component)
     * 'isShow' - will only show column's with this property set to true.
     * 'isShowTitle' - will only show the column's title if this property is set to true.
     * 'concat' -  You could define a column you'de like to concat it's value with.   
     * for example: to concat project number to project description:
     * 'PROJ' {
     *     isShow: false // so this column will not show seperatly.
     * }
     * 'PROJDES' {
     *     concat: 'PROJ'
     * }
     * Note:
     * Date values are displayed according to the column's 'format' property.
     * Columns with empty values are not displayed.
     */

    dirByLang = Constants.dirByLang;
    // _inline;

    @Input('Form') form;
    @Input('Item') item;
    @Input('ColumnsOptions') columnsOptions;
    // @Input() inline(val)
    // {
    //   this._inline = true;
    // };

     constructor(private formService: FormService) { }

    displayValue(column)
    {
        if(!this.item[column.key])
            return '';
        let columnOptions = this.getColumnOption(column.key);
        if (column.type == 'date')
        {
                return moment.utc(this.item[column.key]).format(column.format);
        }
        if (columnOptions && columnOptions.concat && this.item[columnOptions.concat] !== undefined)
        {
            return this.item[column.key] + ' ' + this.item[columnOptions.concat];
        }
        return this.item[column.key];
    }
    getColumnOption(columnName):ColumnOptions
    {
        if (this.columnsOptions && this.columnsOptions[columnName])
            return this.columnsOptions[columnName];
        return null;
    }
    
    getColumnOptionValue(columnName,option):any
    {
        if (this.columnsOptions && this.columnsOptions[columnName] && this.columnsOptions[columnName][option])
            return this.columnsOptions[columnName][option];
        return null;
    }
    
    columnClicked(item, column)
    {
        let columnOptions = this.getColumnOption(column.key);
        if (columnOptions && columnOptions.click)
        {
            event.preventDefault();
            columnOptions.click(item, column);
        }
    }
    columnDirection(column)
    {
        let columnOptions = this.getColumnOption(column.key);
        if ((column.type == 'date' || column.type == 'number') && (!columnOptions || columnOptions && !columnOptions.concat))
        {
            return 'ltr';
        }
        return Constants.dirByLang;
    }

    isShowColumn = (column) =>
    {
        let columnOptions = this.getColumnOption(column.key);
        return columnOptions && columnOptions.isShow && (this.displayValue(column) != '' || columnOptions.avatar);
    }
    /**
     * Indicates whether the column has an 'onclick' option.
     * 
     * @param {any} column 
     * 
     * @memberOf ItemDetails
     */
    isLink(column)
    {
        let columnOptions = this.getColumnOption(column.key);
        return columnOptions && columnOptions.click;
    }
    sortColumns = (column1, column2) =>
    {
        let columnOptions1 = this.getColumnOption(column1.key);
        let columnOptions2 = this.getColumnOption(column2.key);
        if (!columnOptions1 || !columnOptions2)
            return 0;
        return columnOptions1.pos - columnOptions2.pos;
    }
    getUrl(column)
    {
        let urlRelative: string = this.item[column.key];
        let columnOptions = this.getColumnOption(column.key);
        if (urlRelative)
        {
            return this.formService.getFileUrl(this.form, urlRelative);
        }
        if(columnOptions &&  typeof columnOptions.avatar === 'string' && columnOptions.avatar.length > 0)
        {
            return columnOptions.avatar;
        }
        return '';

    }
}
