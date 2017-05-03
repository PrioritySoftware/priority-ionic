import { Component, Injectable,ChangeDetectorRef } from "@angular/core";
import { NavParams, PopoverController, Popover } from 'ionic-angular';
import { Constants } from '../../constants.config';
import { ProgressOptions } from '../../entities/progressOptions.class';
import { Subject } from 'rxjs/Subject';

@Component({
    templateUrl: './progress-bar.html',
    styleUrls: ['./progress-bar.scss']
})
export class ProgressBar
{
    dirByLang: string;
    progressText: string;
    cancelBtnText: string;

    cancel;
    progVal;
    constructor(private navParams: NavParams,private changeRef:ChangeDetectorRef)
    {
        let progressoptions: ProgressOptions = this.navParams.data.progressoptions;
        this.progVal = 0;
        progressoptions.progVal.subscribe(
            value =>
            {
                this.progVal = value;
                this.changeRef.detectChanges();
            });
        this.cancel = progressoptions.cancel;

        this.progressText = progressoptions.progressText;
        this.cancelBtnText = Constants.cancel;
        this.dirByLang = Constants.dirByLang;
    }
}

@Injectable()
export class ProgressBarHandler
{
    private popover: Popover;
    private progressOptions: ProgressOptions;
   
    constructor(private popoverCtrl: PopoverController)
    {}

    /**
     * Presents a popover with a progress bar. The values of the progress are percents.
     * 
     * @param {ProgressOptions} progressoptions 
     * 
     * @memberOf ProgressBarHandler
     */
    present(progressoptions: ProgressOptions)
    {
        let options= {
            cancel: () => { },
            progVal: new Subject<number>(),
            progressText: Constants.wait
        };
        this.progressOptions = Object.assign(options, progressoptions);
        this.popover = this.popoverCtrl.create(ProgressBar, { progressoptions: this.progressOptions }, { enableBackdropDismiss: false });
        this.popover.present();
    }
    /**
     * Didmisses the popover if it has already benn presented.
     * 
     * 
     * @memberOf ProgressBarHandler
     */
    dismiss()
    {
        if (this.popover)
            this.popover.dismiss();
        this.popover = null;
        this.progressOptions.progVal.complete();
    }

    /**
     * Updates the progress value.
     * 
     * @param {number} value 
     * 
     * @memberOf ProgressBarHandler
     */
    updateProgVal(value: number)
    {
        this.progressOptions.progVal.next(value);
    }
    /**
     * Rerutns true if the progressbar popover is already open, otherwise returns false.
     * 
     * @returns {boolean} 
     * 
     * @memberOf ProgressBarHandler
     */
    isPresented(): boolean
    {
        return this.popover != null;
    }

}