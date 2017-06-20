import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormService } from '../../services/form.service';
import { Form } from '../../entities/form.class';
import { ColumnsOptions } from '../../entities/columnOptions.class';
import { FormsOptions, FormOptions } from '../../entities/formOptions.class';
import { ButtonOptions } from '../../entities/buttonOptions.class';
import { ItemOptions } from '../../entities/itemOptions.class';

@Component({
    selector: 'form-item',
    templateUrl: 'form-item.html',
    styleUrls: ['./form-item.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('subformsInOut', [
            state('in', style({height: '*'})),
            transition(':enter', [
                style({height: '0px'}),
                animate('200ms ease-out')
            ]),
            transition(':leave', [
                animate('200ms ease-in', style({height: '0px'}))
            ])
        ]),
    ]
})

export class FormItem
{
    itemClick: Function;
    //subformNames: Array<string> = [];
    subformsOptions: FormsOptions;
    itemTitle: string;
    itemClass: Function;

    rightButtons: Array<ButtonOptions> = [];
    leftButtons: Array<ButtonOptions> = [];

    subforms: {[key: string]: Form} = {};

    cssClass: string = '';
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
        this.itemClick = itemOptions.click;
        //this.subformNames = itemOptions.subforms;
        // if(this.subformNames && this.subformNames.length)
        // {
        //     this.collapseState = 'collapsed';
        // }
        this.subformsOptions = itemOptions.subforms ? itemOptions.subforms : {};
        if(Object.keys(this.subformsOptions).length)
        {
            this.collapseState = 'collapsed';
        }
        this.itemTitle = itemOptions.title;
        this.itemClass = itemOptions.cssClass;
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
    _inline = true;
    @Input() set inline(val)
    {
        this._inline = val;
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
                    this.formService.getSubforms(this.form, Object.keys(this.subformsOptions)).then(
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
        let subformClick = this.subformsOptions[subform.key] && this.subformsOptions[subform.key].click;
        if(subformClick)
        {
            event.preventDefault();
            subformClick(subform,this.item, this.form);
        }
    }

    subformCssClass(subform)
    {
        let cssClass = 'subform ' + subform.name;
        if(!this.isTextForm(subform) && !this.isOneLine(subform))
        {
            cssClass += ' multiline '
        }
        return cssClass;
    }

    sortSubforms = (subform1, subform2) =>
    {
        let subformOptions1: FormOptions = this.subformsOptions[subform1.key];
        let subformOptions2: FormOptions = this.subformsOptions[subform2.key];
        if (subformOptions1.pos > subformOptions2.pos)
        {
            return 1;
        }
        if (subformOptions2.pos > subformOptions1.pos)
        {
            return -1;
        }
        return 0;
    }

    // **************** Buttons **************************

    buttonClicked(slidingItem, button, item)
    {
        slidingItem.close();
        button.click(item);
    }

    itemClicked(event)
    {
      if(event.defaultPrevented) return;
      if(this.itemClick !== undefined)
      {
          this.itemClick(this.item, this.form);
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
