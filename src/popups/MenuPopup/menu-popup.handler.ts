import { Component } from "@angular/core";
import { NavParams } from 'ionic-angular';
import { Constants } from '../../constants.config';

@Component({
    templateUrl: './menu-popup.html',
    styleUrls: ['./menu-popup.scss']
})
export class MenuPopup
{

    dirByLang: string;

    title: string;
    cssClass: string;
    buttons: any[];
    items: any[];

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