import { Component, Input, ContentChild, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Form } from '../../entities/form.class';
import { Constants } from '../../constants.config';
import * as numeral from 'numeral';

@Component({
  selector: 'form-list',
  templateUrl: 'form-list.html',
  encapsulation: ViewEncapsulation.None
})
export class FormList {

    /**
     * This component is used to display an array of 'Priority Rows' of a 'Priority Form' as a list.
     * Inputs:
     * 'Form' - The form object (returned by the api with startForm) of the list to diplay.
     * 'Items' - An Array (not object!!!) of the form rows to display.
     * Optional Inputs:
     * 'Filter'- An object where the key is a 'Priority Column' name, and the value is the column's value to filter.
     * for example:
     * {
     *     'CUST': '333',
     *     'CSTDES': '333'
     * }
     * filters customers whose name or number contains '333'.
     * 'Sort' - A 'Priority Column' name for sorting the list.
     * The sort direction could be defined with the 'sortDirection' property defined in the column in form.columns. (value: 1 or -1)
     * (If you're using 'FormService' you could init your column's properties with 'initForm' and these will automatically be passed to this component)
     * 'Subforms' - An array of 'Priority Subform' names that will be displayed in each item - when it is expanded. see 'form-card-item'.
     */

    dirByLang;
    _type = 'default';

    @Input('Form') form;
    @Input('Items') items: any[];
    @Input('Filter') filter;
    @Input('Sort') sortColumn;
   
    itemOptions = {} as any;
    @Input() set ItemOptions(itemOptions)
    {
        this.itemOptions = itemOptions;
    }
    columnsOptions:any;
    @Input() set ColumnsOptions(columnsOptions)
    {
        this.columnsOptions = columnsOptions;
    }

    @Input() set card(val)
    {
        this._type = 'card';
    }

    @Input() set default(val)
    {
        this._type = 'default';
    }

    @Input() set type(val)
    {
        this._type = val? val : 'default';
    }


    constructor()
    {
    	this.dirByLang = Constants.dirByLang;
    }

    isShow(val, filterVal, filterType) : boolean
    {
        if(filterVal == '')
        {
           return true;
        }
        else if(val != null)
        {

            switch (filterType)
            {
                case 'equals':
                    return val == filterVal;
                case 'includes':
                    return val.includes(filterVal);
                case 'startsWith':
                    return val.startsWith(filterVal);
            }
        }
        return false
    }

    filterItems = (item,filter) =>
    {
        if(filter === undefined || filter.columns === undefined)
        {
            return true;
        }
        let filterColumns = filter.columns;
        let filterType = filter.type === undefined ? 'includes' : filter.type;
        if(Object.keys(filterColumns).length === 0)
        {
            return true;
        }
        for (var column in filterColumns)
        {
            if(typeof filterColumns[column] === 'object')
            {
                for (var i in filterColumns[column])
                {
                    if(this.isShow(item[column],filterColumns[column][i],filterType))
                    {
                        return true;
                    }
                }
            }
            else
            {
                if(this.isShow(item[column],filterColumns[column],filterType))
                {
                    return true;
                }
            }  
        }
        return false;
    }

    sortItems = (item1,item2,sortColumn) =>
    {
        if(sortColumn === undefined)
        {
            return 0;
        }
        let sortDirection = this.form.columns[sortColumn].sortDirection;
        sortDirection = sortDirection ? sortDirection : 1;
        let val1 = item1[sortColumn];
        let val2 = item2[sortColumn];
        if(this.form.columns[sortColumn].type == 'number')
        {
            val1 = numeral(val1)._value;
            val2 = numeral(val2)._value;
        }
        if( val1  > val2)
        {
            return 1 * sortDirection;
        }
        else if( val1 < val2 )
        {
            return -1 * sortDirection;
        }
        return 0;
    }

    subformClick(subform)
    {
        if(this.itemOptions.subformClick)
        {
            this.itemOptions.subformClick(subform);
        }
    }
          
}
