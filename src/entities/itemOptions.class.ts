import { FormsOptions } from './formOptions.class';
import { ButtonOptions } from './buttonOptions.class';
export interface ItemOptions
{
	itemSelect?: Function;
    subforms?: Array<string>;
    subformsOptions?: FormsOptions;
    itemTitle?: string;
    itemClass?: Function;
    slidingButtons?: Array<ButtonOptions>;
}