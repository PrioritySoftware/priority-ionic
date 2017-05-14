import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormService } from '../../services/form.service';
import { Form } from '../../entities/form.class';
import { ColumnsOptions } from '../../entities/columnOptions.class';
import { FormsOptions } from '../../entities/formOptions.class';
import { ButtonOptions } from '../../entities/buttonOptions.class';
import { ItemOptions } from '../../entities/itemOptions.class';


@Component({
    selector: 'form-item',
    templateUrl: 'form-item.html',
    styleUrls: ['./form-item.scss'],
    encapsulation: ViewEncapsulation.None,
    // animations: [
    //     trigger('cardHeightTrigger', [
    //         state('expanded', style({ height: '*' })),
    //         state('collapsed', style({ height: '*' })),
    //         transition('collapsed => expanded', animate('250ms 100ms ease-in')),
    //         transition('expanded => collapsed', animate('250ms 200ms ease-out'))
    //     ]),
    // ]
})

export class FormItem
{
    itemSelect: Function;
    subformNames: Array<string>;
    subformsOptions: FormsOptions;
    itemTitle: string;
    itemClass: Function;

    rightButtons: Array<ButtonOptions> = [];
    leftButtons: Array<ButtonOptions> = [];

    subforms: {[key: string]: Form} = {};

    collapseState: string = '';
    isLoadingSubforms: boolean = false;

    @Input('Form') form: Form;

    avatar;
    thumbnail;
    columnsOptions: ColumnsOptions;
    @Input() set ColumnsOptions(columnsOptions: ColumnsOptions)
    {
        this.columnsOptions = columnsOptions;
        for(var column in columnsOptions)
        {
            if(columnsOptions[column].avatar)
            {
                this.avatar = columnsOptions[column];
                this.avatar.column = column;
            }
            if(columnsOptions[column].thumbnail)
            {
                this.thumbnail = columnsOptions[column];
                this.thumbnail.column = column;
            }
        }
    }
    @Input('Item') item;
    @Input() set ItemOptions(itemOptions: ItemOptions)
    {
        this.itemSelect = itemOptions.itemSelect;
        this.subformNames = itemOptions.subforms;
        if(this.subformNames && this.subformNames.length)
        {
            this.collapseState = 'collapsed';
        }
        this.subformsOptions = itemOptions.subformsOptions ? itemOptions.subformsOptions : {};
        this.itemTitle = itemOptions.itemTitle;
        this.itemClass = itemOptions.itemClass;
        let buttons = itemOptions.slidingButtons;
        if (buttons !== undefined)
        {
            buttons.forEach(
                button =>
                {
                    if (button.side == 'left')
                    {
                        this.leftButtons.push(button);
                    }
                    else
                    {
                        this.rightButtons.push(button);
                    }
                });
        }
    }
    _type = 'default';
    @Input() set type(type)
    {
        this._type = type;
        this.setCssClass(type);
    }
    // @Input() set card(card)
    // {
    //     this.setCssClass('card');
    // }
    // @Input() set default(default)
    // {
    //     this.setCssClass('default');
    // }

    constructor(private formService: FormService) { }

    // ******************** Css *********************

    setCssClass(className)
    {
        this.cssClass = this.cssClass + ' ' + className;
    }

    // ******************** Collapse - Expand **************************

    toggleCollapse(event)
    {
        event.preventDefault();
        if (this.collapseState == 'collapsed' || this.collapseState == '')
        {
            this.isLoadingSubforms = true;
            this.formService.setActiveRow(this.form, this.item.key).then(
                () =>
                {
                    this.formService.getSubForms(this.form, this.subformNames, this.item.key).then(
                        (subforms) =>
                        {
                            this.subforms = subforms;
                            this.isLoadingSubforms = false;
                            this.collapseState = 'expanded';
                        },
                        reason =>
                        {
                            this.isLoadingSubforms = false;
                        })
                },
                reason =>
                {
                    this.isLoadingSubforms = false;
                });

        }
        else
        {
            this.collapse();
        }
    }

    collapse = () =>
    {
        if (this.collapseState == 'expanded')
        {
            this.collapseState = 'collapsed';
        }
    }

    // ****************** Subforms ************************

    isTextForm(subform)
    {
        return subform.ishtml == 1;
    }

    isOneLine(subform)
    {
        return subform.oneline == 1;
    }

    getRowsCount(subform)
    {
        return Object.keys(subform.rows).length;
    }

    hasRows = (subform) =>
    {
        if (this.isTextForm(subform))
        {
            //if (subform.rows["1"] != null)
            return subform.rows[1].htmltext != '';
            //return false;
        }
        else
        {
            return Object.keys(subform.rows).length !== 0
        }
    }

    subformItem(subform)
    {
        return subform.rows[1];
    }

    subformClicked(subform)
    {
        let subformClick = this.getSubformOption(subform,'click');
        if(subformClick)
        {
            event.preventDefault();
            subformClick();
        }
    }

    getSubformOption(subform,option)
    {
        return this.subformsOptions[subform.key] && this.subformsOptions[subform.key][option];
    }

    // **************** Buttons **************************

    buttonClicked(slidingItem, button, item)
    {
        slidingItem.close();
        button.click(item);
    }

    selectItem(event)
    {
      if(event.defaultPrevented) return;
      if(this.itemSelect !== undefined)
      {
          this.itemSelect(this.item, this.form);
      }
    }

    // ********** Item Class *********

    setItemClass(item)
    {
        if(this.itemClass)
            return this.itemClass(item);
        return {};
    }

    // ********* Avatar and Thumbnail *****************

    getUrl(columnOptions)
    {
        let urlRelative: string = this.item[columnOptions.column];
        if (urlRelative)
        {
            return this.formService.getFileUrl(this.form, urlRelative);
        }
        if(typeof columnOptions.avatar === 'string' && columnOptions.avatar.length > 0)
        {
            return columnOptions.avatar;
        }
        if(typeof columnOptions.thumbnail === 'string' && columnOptions.thumbnail.length > 0)
        {
            return columnOptions.thumbnail;
        }
        return '';
    }

}
