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
    message: string;        
    cssClass: string;
    isButtons: boolean;
    disableButton : boolean = false;
    nolines : boolean;

    items: Array<ButtonOptions>; // items should be merged with buttons

    constructor(private navParams: NavParams)
    {
        this.dirByLang = Constants.dirByLang;
    }

    ionViewDidLoad()
    {
        this.title = this.navParams.data.title;
        this.message = this.navParams.data.message;
        this.items = this.navParams.data.items;
        this.cssClass = this.navParams.data.cssClass ? this.navParams.data.cssClass : "";
        this.nolines = this.navParams.data.nolines;//"noline-list" "buttons" "list"
        // this.isButtons = this.navParams.data.type == "buttons" ? true : false;
    }


}