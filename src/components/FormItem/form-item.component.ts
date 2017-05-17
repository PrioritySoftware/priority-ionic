import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormService } from '../../services/form.service';
import { Constants } from '../../constants.config';
import { Form } from '../../entities/form.class';
import { ColumnsOptions } from '../../entities/columnOptions.class';


@Component({
    selector: 'form-item',
    templateUrl: 'form-item.html',
    styleUrls: ['./form-item.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FormItem
{
    dirByLang = Constants.dirByLang;
    itemSelect;
    itemClass;
    rightButtons = [];
    leftButtons = [];

    @Input('Form') form : Form;
    @Input('ColumnsOptions') columnsOptions : ColumnsOptions;
    @Input('Item') item;
    @Input() set ItemOptions(itemOptions)
    {
        this.itemSelect = itemOptions.itemSelect;
        this.itemClass=itemOptions.itemClass;
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

    // **************** Buttons **************************

    buttonClicked(slidingItem, button, item)
    {
        slidingItem.close();
        button.click(item);
    }

    selectItem()
    {
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
