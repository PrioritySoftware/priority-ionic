import { Component } from "@angular/core";
import { NavParams } from 'ionic-angular';
import { Constants } from '../../constants.config';
import { ButtonOptions } from "../../entities/buttonOptions.class";

@Component({
    templateUrl: './menu-popup.html',
    styleUrls: ['./menu-popup.scss']
})
export class MenuPopup
{

    dirByLang: string;

    title: string;
    cssClass: string;
    buttons: Array<ButtonOptions>;
    items: Array<ButtonOptions>; // items should be merged with buttons

    constructor(private navParams: NavParams)
    {
        this.dirByLang = Constants.dirByLang;
        this.cssClass = "";
    }

    ionViewDidLoad()
    {
        this.buttons = this.navParams.data.buttons;
        this.title = this.navParams.data.title;
        this.items = this.navParams.data.items;
        if (this.navParams.data.cssClass != null)
            this.cssClass = this.navParams.data.cssClass;
    }


}