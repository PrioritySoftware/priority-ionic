import { FormsOptions } from './formOptions.class';
import { ButtonOptions } from './buttonOptions.class';
export interface ItemOptions
{
	click?: Function;
    subforms?: FormsOptions;
    title?: string;
    cssClass?: Function;
    slidingButtons?: Array<ButtonOptions>;
}