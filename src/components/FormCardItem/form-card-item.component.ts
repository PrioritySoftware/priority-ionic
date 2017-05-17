import { Component, Input, Output, EventEmitter, ViewEncapsulation, trigger, state, style, transition, animate } from '@angular/core';
import { FormService } from '../../services/form.service';
import { Form } from '../../entities/form.class';
import { ColumnsOptions } from '../../entities/columnOptions.class';
import { FormsOptions } from '../../entities/formOptions.class';
import { ButtonOptions } from '../../entities/buttonOptions.class';
import { ItemOptions } from '../../entities/itemOptions.class';

@Component({
    selector: 'form-card-item',
    templateUrl: 'form-card-item.html',
    styleUrls: ['./form-card-item.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('cardHeightTrigger', [
            state('expanded', style({ height: '*' })),
            state('collapsed', style({ height: '*' })),
            transition('collapsed => expanded', animate('250ms 100ms ease-in')),
            transition('expanded => collapsed', animate('250ms 200ms ease-out'))
        ]),
    ]
})

export class FormCardItem
{
    itemSelect: Function;
    subformNames: Array<string>;
    subformsOptions: FormsOptions;
    itemTitle: string;
    itemClass: Function;

    rightButtons: Array<ButtonOptions> = [];
    leftButtons: Array<ButtonOptions> = [];

    subforms: {[key: string]: Form} = {};

    collapseState: string = 'collapsed';
    isLoadingSubforms: boolean = false;

    @Input('Form') form : Form;
    @Input('ColumnsOptions') columnsOptions: ColumnsOptions;
    @Input('Item') item;
    @Input() set ItemOptions(itemOptions : ItemOptions)
    {
        this.itemSelect = itemOptions.itemSelect;
        this.subformNames = itemOptions.subforms;
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

    constructor(private formService: FormService) { }

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
            this.collapseState = 'collapsed';
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

}
