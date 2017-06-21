import { ButtonOptions } from "./buttonOptions.class";
export interface MenuPopupOptions
{
    title?: string;
    items: Array<ButtonOptions>;
    cssClass?: string;
    /**
     * Items' type. May be 'buttons' or 'items' - default is 'items'.
     * Items could be displayed as a list of buttons that may have icons or as a regular list.
     * @type {string}
     * @memberof MenuPopupOptions
     */
    type?:string;
}