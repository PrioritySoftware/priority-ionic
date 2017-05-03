import { Component, ViewChildren, QueryList } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { FormService } from '../../services/form.service';
import { Search } from '../../entities/search.class';
import { SearchResult } from '../../entities/searchResult.class';
import { ObjToIterable } from '../../pipes/objToIterable.pipe';
import { Constants } from '../../constants.config';


@Component({
    selector: 'filter-menu',
    templateUrl: 'filter-menu.html',
    styleUrls: ['./filter-menu.scss']
})
export class FilterMenu {

    form;
    filterColumns: any[] = [];
    filter;
    sortColumns: any[] = [];
    sort;
    options = {};
    objToIterable;
    translations;

    constructor(navParams: NavParams, public viewCtrl: ViewController, private formService: FormService)
    {
        this.form = navParams.data.form;
        //filter
        this.filterColumns = navParams.data.filterColumns;
        this.filter = navParams.data.filter;
        this.filterColumns.forEach(column =>
            {
                //If you want to have custom options for a filter column
                //not from the column's choose
                if(navParams.data.filterOptions[column] != null)
                {
                    this.options[column] = navParams.data.filterOptions[column]
                }
                else
                {
                    this.options[column] = [];
                }
            });
        //sort
        this.sortColumns = navParams.data.sortColumns;
        this.sort = navParams.data.sort;
        this.objToIterable = new ObjToIterable();

        this.translations = Constants;
    }

    ionViewDidLoad()
    {
        this.filterColumns.forEach(column =>
        {
            if(this.options[column].length === 0 && Object.keys(this.form.rows).length > 0)//there was getRows on this form
            {
                this.formService.setActiveRow(this.form,1).then(
                    () =>
                    {
                        //need to keep globaly
                        this.formService.openSearchOrChoose(this.form,column,this.form.rows[1][column]).then(//when open choose need to send the current value in field
                            (searchObj: Search) =>
                            {
                                let search = searchObj.SearchLine == null ? searchObj.ChooseLine : searchObj.SearchLine;
                                this.options[column] = this.objToIterable.transform(search);
                            },
                            () => {});
                    },
                    () => { });
            }
        });
    }

    optionValue(option: SearchResult)
    {
        return option.retval;
    }

    displayValue(option: SearchResult)
    {
        return option.string2 || option.string1;
    }

    getSetlectOptions(column)
    {
        return {
            title: this.form.columns[column].title
        }
    }

    close()
    {
        this.viewCtrl.dismiss();
    }

    selectAndClose()
    {
        this.viewCtrl.dismiss({filter: this.filter, sort: this.sort});
    }



}
