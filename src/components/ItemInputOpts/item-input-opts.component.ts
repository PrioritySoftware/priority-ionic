import { Component, Input, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { PopoverController, Platform } from 'ionic-angular';
import { Form } from '../../entities/form.class';
import { Column } from '../../entities/column.class';
import { ColumnsOptions, ColumnOptions } from '../../entities/columnOptions.class';
import { ButtonOptions } from '../../entities/buttonOptions.class';
import { FormService } from '../../services/form.service';
import { PermissionsService } from '../../services/permissions.service';
import { MessageHandler } from '../../popups/Message/message.handler';
import { Constants } from '../../constants.config';
import { FileUploader } from '../FileUploader/file-uploader.component';
import { MenuPopup } from '../../popups/MenuPopup/menu-popup.handler';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
declare var window;

@Component({
    selector: 'item-input-opts',
    templateUrl: 'item-input-opts.html'
})
export class ItemInputOpts implements OnInit {

    @Input('Form') form : Form;
    @Input('Item') item;
    
    columnsOptions : ColumnOptions = {};
    @Input() set ColumnsOptions ( options : ColumnOptions)
    {
        for(let i in options)
        {
            this.columnsOptions[i] = Object.assign({}, options[i]);
        }
    }
    
    // @Input('ColumnsOptions') columnsOptions : ColumnsOptions;

    @Output() columnClick = new EventEmitter<Column>();

    @ViewChild(FileUploader) fileUploader: FileUploader;

    dirByLang = Constants.dirByLang;

    constructor(private formService: FormService,
                private permissions: PermissionsService,
                private popoverCtrl: PopoverController,
                private messageHandler: MessageHandler,
                private platform: Platform,
                private barcodeScanner: BarcodeScanner) {}

    ngOnInit()
    {
        // loop on the form columns to set the 'icon' and 'click' options
        // according to the column type and given columnOptions
        for (var columnName in this.form.columns)
        {
            let column = this.form.columns[columnName];
            let columnOptions = this.columnsOptions[columnName];
            if (columnOptions && columnOptions.isShow)
            {
                if(columnOptions.icon === undefined)//if the 'icon' option isn't set already
                {
                    let icon = this.getColumnIconName(column, columnOptions);
                    columnOptions.icon = icon;
                }
                if(columnOptions.click === undefined)//if the 'click' option isn't set already
                {
                    let click = this.getColumnIconClick(column, columnOptions);
                    columnOptions.click = click;
                }
            }
        }
    }

    // If there is an icon that does not have a custom handler defined
    // An iconClicked event will be emitted.
    // e.g. The search column has a 'down-arrow' icon but doesn't have a click handler
    columnClicked = (column: Column) =>
    {
        this.columnClick.emit(column);
    }

    isReadOnly(column: Column)
    {
        return this.form.isquery == 1 || column.readonly == 1;
    }

    isBoolColumn(column: Column)
    {
        return column.type == "bool";
    }

    isSearch(column: Column)
    {
        return (column.zoom == "Search" || column.zoom == "Choose") && !this.isBoolColumn(column) && !this.isReadOnly(column);
    }

    isBarcode(column: Column, columnOptions : ColumnOptions)
    {
        return (window.cordova) && columnOptions.subtype == "barcode";
    }

    isAttach(column: Column)
    {
        return column.zoom == "Attach";
    }

    isPhone(column: Column, columnOptions : ColumnOptions)
    {
       return columnOptions.subtype == "phone";
    }

    isUrl(column: Column)
    {
       return column.zoom == "URL";
    }

    isEmail(column: Column)
    {
       return column.zoom == "EMail";
    }

    getColumnIconName(column: Column, columnOptions : ColumnOptions)
    {
        if (this.isBarcode(column,columnOptions))
            return "barcode";
        if (this.isPhone(column,columnOptions))
            return "call";
        if (this.isUrl(column))
            return "link";
        if (this.isEmail(column))
            return "mail";
        if (this.isSearch(column))
            return "ios-arrow-down";
        if (this.isAttach(column) && (!this.isReadOnly(column) || this.item[column.key]))
            return "attach";
    }

    getColumnIconClick(column: Column, columnOptions: ColumnOptions)
    {
        if (this.isBarcode(column,columnOptions))
        {
            return this.barcodeScan;
        }
        else if (this.isAttach(column))
        {
            return this.attachClicked;
        }
        else if (this.isPhone(column,columnOptions))
        {
            return ($event, column: Column) =>
            {
                this.openWindow(column,'tel:');
            }
        }
        else if (this.isEmail(column))
        {
            return ($event, column: Column) =>
            {
                this.openWindow(column,'mailto:');
            }
        }
        else if (this.isUrl(column))
        {
            return ($event, column: Column) =>
            {
                this.openWindow(column,'http://');
            }
        }
    }

    openWindow = (column: Column, prefix) =>
    {
        let val = this.item[column.key];
        if(val != null)
        {
            window.open(encodeURI(prefix + val) ,'_system');
        }
    }

     //******************************* Barcode Scan *****************************************

    barcodeScan = ($event, column: Column) =>
    {
        if (window.cordova)
        {
            let columnOptions = this.columnsOptions[column.key];
            this.permissions.requestPermission("camera").then(
                () =>
                {
                    // we need to override the backbutton handler,
                    // so when it is pressed during scanning
                    // we will prevent the default handler
                    let deregisterBackButtonAction = this.platform.registerBackButtonAction(() => { },600); 
                    this.barcodeScanner.scan(
                        {
                            showFlipCameraButton: true,
                            showTorchButton: true,
                            resultDisplayDuration: 0,
                            orientation: "landscape",
                        }).then(
                        result =>
                        {
                            setTimeout(deregisterBackButtonAction, 500);// deregister the backbutton handler with a delay of 500ms
                            if (result == null || result.text == null || result.cancelled)//returned from scan without scanning
                            {
                                if (this.isSearch(column))//if the column is also search
                                {
                                    this.columnClicked(column);// emit the click event
                                }
                            }
                            else if (this.item[column.key] != result.text)
                            {
                                let prevVal = this.item[column.key];
                                this.item[column.key] = result.text;
                                let event = new CustomEvent('updatefield',{ detail: 
                                                            {
                                                              value: this.item[column.key],
                                                              prevVal: prevVal,
                                                              field: column.key
                                                            },
                                                            bubbles: true});
                                $event.target.dispatchEvent(event);
                            }
                        }).catch(
                        reason =>
                        {
                            this.messageHandler.showToast(Constants.scanError + reason);
                        });
                },
                error =>
                {
                    this.messageHandler.showToast(Constants.scanError);
                });
        }
    }

    //******************************* Attachments *****************************************

    attachClicked = ($event, column: Column) =>
    {
        if (this.isReadOnly(column))
        {
            if (this.item[column.key])
            {
                this.openAttach(this.item[column.key]);
            }
        } 
        else if (this.item[column.key])
        {
            let popover;
            let openAttach: ButtonOptions = {
                text: Constants.openBtnText,
                click: () =>
                {
                    popover.dismiss();
                    this.openAttach(this.item[column.key]);
                }
            }
            let changeAttach: ButtonOptions = {
                text: Constants.changeBtnText,
                click: () =>
                {
                    popover.dismiss();
                    this.fileUpload($event,column);
                }
            }
            popover = this.popoverCtrl.create(MenuPopup, {
                items: [openAttach, changeAttach],
            });
            popover.present({ ev: $event });
        }
        else
        {
            this.fileUpload($event,column);
        }
    }

    /** upload a file in a field */
    fileUpload($event, column: Column)
    {
        this.fileUploader.uploadFile().then(
            result =>
            {
                let prevVal = this.item[column.key];
                this.item[column.key] = result.file;
                let event = new CustomEvent('updatefield', { detail: 
                                            {
                                              value: this.item[column.key],
                                              prevVal: prevVal,
                                              field: column.key
                                            },
                                            bubbles: true});
                $event.target.dispatchEvent(event);
            }, reason => { });
    }

    openAttach(url)
    {
        window.open(encodeURI(this.formService.getFileUrl(this.form, url)), "_blank");
    }

}
