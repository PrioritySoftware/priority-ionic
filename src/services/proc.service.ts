import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MessageHandler } from "../popups/Message/message.handler";
import { Constants } from '../constants.config';
import { Proc } from "../entities/proc.class";
import { ProcStepType } from "../entities/procStepType.class";
import { ServerResponse } from "../entities/srvResponse.class";
import { Filter } from "../entities/filter.class";
import { MessageOptions } from "../entities/messageOptions.class";
import { ServerResponseType } from "../entities/srvResponseType.class";
import { ServerResponseCode } from "../entities/srvResponseCode.class";
import { ProgressOptions } from "../entities/progressOptions.class";
import { ProgressBarHandler } from "../popups/ProgressBar/progress-bar.handler";
declare var procStart;

@Injectable()
export class ProcService
{
    constructor(private messageHandler: MessageHandler, private progressBarHandler: ProgressBarHandler)
    {
    }
    /**
    * Starts a procedure with the given name.
    * 
    * @param {string} name 
    * @param {string} type 
    * @param {string} dname 
    * 
    * @memberOf ProcService
    */
    startProcedure(name: string, type: string, dname: string): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            procStart(name, type, this.procProgress, dname)
                .then(data =>
                {
                    return this.procSuccess(data);
                })
                .then(() =>
                {
                    resolve();
                })
                .catch(reason => 
                {
                    this.errorHandling(reason, reject);
                });
        });
    }
    /**
     * Handles errors.
     * 
     * @param {Proc} proc 
     * @param {any} error 
     * 
     * @memberOf ProcService
     */
    errorHandling(reason, reject)
    {
        this.messageHandler.showErrorOrWarning(true, reason.text);
        reject();
    }

    /**
     * A callback that is used when the procedure is executing for a long time. 
     * Presents a popup with a progress-bar in it.
     * 
     * @memberOf ProcService
     */
    procProgress = (proc: Proc, progress: number) =>
    {
        this.messageHandler.hideLoading(() =>
        {
            if (this.progressBarHandler.isPresented())
                this.progressBarHandler.updateProgVal(progress);
            else
                this.progressBarHandler.present({
                    cancel: () =>
                    {
                        proc.cancel().then(() =>
                        {
                            this.progressBarHandler.dismiss();
                        });
                    },
                    progressText: Constants.wait
                });
        });
    }
    /**
     * Called wen the procedure returns from the server after it succeeded.
     * Used to analyze the response and decide what to do next.
     * @param data 
     */
    procSuccess(data): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            if (this.progressBarHandler.isPresented())
                this.progressBarHandler.dismiss();
            switch (data.type)
            {
                case ProcStepType.InputFields:
                    {

                    }
                    break;
                case ProcStepType.InputOptions:
                    {

                    }
                    break;
                case ProcStepType.InputHelp:
                    {

                    }
                    break;
                case ProcStepType.Message:
                    {
                        this.procMessageStep(data)
                            .then(() => resolve())
                            .catch(reason => reject(reason));
                    }
                    break;
                case ProcStepType.ReportOptions:
                    {
                    }
                    break;
                case ProcStepType.DocumentOptions:
                    {
                        this.procDocOptionsStep(data)
                            .then(() => resolve())
                            .catch(reason => reject(reason));
                    }
                    break;
                case ProcStepType.DisplayUrl:
                    {
                        this.procDisplayStep(data)
                            .then(() => resolve())
                            .catch(reason => reject(reason));
                    }
                    break;
                case ProcStepType.End:
                    {
                        resolve();
                    }
                    break;

            }
        });
    }
    /**
     * Called when the procedure is executing a message step.
     * @param data 
     */
    procMessageStep(data): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            let onApprove = () =>
            {
                data.proc.message(1)
                    .then(data => this.procSuccess(data))
                    .then(() => resolve())
                    .catch(reason => reject(reason));
            };
            let onCancel = () =>
            {
                data.proc.message(0)
                    .then(data => this.procSuccess(data))
                    .then(() => resolve())
                    .catch(reason => reject(reason));
            };
            let isError = data.messageType != ServerResponseType.Warning;
            this.messageHandler.showErrorOrWarning(isError, data.message, onApprove, onCancel);
        });
    }
    /**
     * Called when the procedure is executing a displayUrl step. The url is of a report ready to be presented.
     * @param {any} data 
     * @returns {Promise<any>} 
     * 
     * @memberOf ProcService
     */
    procDisplayStep(data): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            for (let urlObj of data.Urls)
            {
                //We used '_system' because '_blank' doesn't work on IOS.
                window.open(encodeURI(urlObj.url), '_system');
            }
            data.proc.continueProc()
                .then(data => this.procSuccess(data))
                .then(() => resolve())
                .catch(reason => reject(reason));
        });
    }
    procDocOptionsStep(data)
    {
         return new Promise((resolve, reject) =>
        {
            data.proc.documentOptions(1,1,2)
                .then(data => this.procSuccess(data))
                .then(() => resolve())
                .catch(reason => reject(reason));
        });
    }
}