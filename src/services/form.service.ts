import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MessageHandler } from "../popups/Message/message.handler";
import { Constants } from '../constants.config';
import { Form } from "../entities/form.class";
import { ServerResponse } from "../entities/srvResponse.class";
import { Filter } from "../entities/filter.class";
import { QueryValue } from "../entities/queryValue.class";
import { MessageOptions } from "../entities/messageOptions.class";
import { ServerResponseType } from "../entities/srvResponseType.class";
import { ServerResponseCode } from "../entities/srvResponseCode.class";
import { ProcService } from "./proc.service";
//import * as priority from 'priority-web-sdk';
/** formStart(formName,dname, onSuccess, onError,onShowMessge, onUpdateFields,autoRetrieveFirstRows) */
declare var formStart;

@Injectable()
export class FormService
{
    private forms: { [key: string]: Form };
    onFatalError;

    constructor(private messageHandler: MessageHandler, private procService: ProcService)
    {
        this.forms = {};
    }

    // *************** General functions **************
    /**Handles API rejections. If the rejection reason is a fatal error, calls 'onFatalError' else calls 'reject'. */
    rejectionHandler(reason: ServerResponse, reject)
    {
        if (reason.fatal && this.onFatalError !== undefined)
        {
            this.onFatalError();
            reject(reason);
        }
        reject(reason);
    }
    cancelWarn = (form: Form) =>
    {
        form.warningConfirm(0);
    }
    approveWarn = (form: Form) =>
    {
        form.warningConfirm(1);
    }
    /** Global error and warning handler passed to api with formStart.*/
    errorAndWarningMsgHandler = (serverMsg: ServerResponse) =>
    {
        let isError;
        let options: MessageOptions = {};
        if (serverMsg.fatal)
        {
            //If the error is a fatal error adds Constants.fatalErrorMsg to the message.
            this.messageHandler.showErrorOrWarning(true, "<b>" + Constants.fatalErrorMsg + "</b>" + serverMsg.message);
            return;
        }
        if (serverMsg.code == ServerResponseCode.ReadWrite)
        {
            //Sets buttons text for a text-form message.
            options.buttonsText = new Array();
            options.buttonsText.push(Constants.approveReadOnly);
            options.buttonsText.push(Constants.approveEditText);
        }

        // Sets is'Error' and message title.
        if (serverMsg.type == ServerResponseType.Error || serverMsg.type == ServerResponseType.APIError || serverMsg.code == ServerResponseCode.Stop)
        {
            isError = true;
            options.title = serverMsg.code == ServerResponseCode.Information ? Constants.defaultMsgTitle : Constants.errorTitle;
        }
        else
        {
            isError = false;
            options.title = Constants.warningTitle;
        }

        this.messageHandler.showErrorOrWarning(isError, serverMsg.message,
            () =>
            {
                this.approveWarn(serverMsg.form);
            },
            () =>
            {
                this.cancelWarn(serverMsg.form);
            },
            options);
    }

    /** Global callback for all forms,rows,fileds updates returned from api - passed to api with formStart*/
    updateFormsData = (result, parentForm: Form) =>
    {
        //loop on all formname in the result object
        for (var formName in result)
        {
            let form = this.getForm(formName, parentForm);
            if (form == undefined)
            {
                form = this.getForm(formName);
            }
            if (form !== undefined && form.rows !== undefined)
            {
                //loop on rows for form in result object
                for (var rowInd in result[formName])
                {
                    let row = this.getFormRow(form, rowInd);
                    let newRow = result[formName][rowInd];
                    if (row !== undefined)
                    {
                        //loop on properties for row in result object and assign them to row
                        for (var key in newRow)
                        {
                            // skip loop if the property is from prototype
                            if (!newRow.hasOwnProperty(key)) continue;
                            var newValue = newRow[key];
                            this.setIsRowChangesSaved(form, rowInd, false);
                            row[key] = newValue;
                        }
                    }
                }
            }
        }
    }

    // ******** Form **********

    public getForm(formName: string, parentFrom: Form = null): Form
    {
        if (parentFrom)
        {
            return parentFrom.subForms[formName];
        }
        else
        {
            return this.forms[formName];
        }
    }
    /** Sets a form returned from formStart in the forms object by it's mame*/
    private mergeForm(form: Form, parentFrom: Form = null)
    {
        let localform;
        let forms;
        // assign localform and forms
        if (parentFrom)
        {
            localform = parentFrom.subForms[form.name];
            if (localform && localform.rows == undefined)
            {
                localform.rows = {};
            }
            forms = parentFrom.subForms;
        }
        else
        {
            localform = this.forms[form.name];
            forms = this.forms;
        }

        // set form in forms - first time no need to merge
        if (localform == undefined)
        {
            form.rows = {};
            forms[form.name] = form;
        }
        // merge local form and form and set in forms
        else
        {
            //merge form with local form
            forms[form.name] = Object.assign(localform, form);
        }
    }

    /** Starts parent form. */
    startParentForm(formName: string, company: string, autoRetriveFirstRows?: number): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            formStart(formName, this.errorAndWarningMsgHandler, this.updateFormsData, company, autoRetriveFirstRows).then(
                (form: Form) =>
                {
                    this.mergeForm(form);
                    resolve(this.getForm(form.name));
                },
                (reason: ServerResponse) =>
                {
                    this.rejectionHandler(reason, reject);

                });
        });
    }
    /** Starts parent form and retrieves its rows according to the given filter if there is one. */
    startFormAndGetRows(formName: string, company: string, filter: Filter = null, autoRetriveFirstRows?: number): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            this.startParentForm(formName, company).then(
                form =>
                {
                    this.setSearchFilter(form, filter).then(
                        res =>
                        {
                            this.getRowsAndReplace(form).then(
                                rows =>
                                {
                                    resolve(form);
                                },
                                (reason: ServerResponse) =>
                                {
                                    this.rejectionHandler(reason, reject);
                                });
                        },
                        (reason: ServerResponse) =>
                        {
                            this.rejectionHandler(reason, reject);
                        });
                },
                (reason: ServerResponse) =>
                {
                    this.rejectionHandler(reason, reject);
                });
        });
    }
    /** Ends from. */
    endForm(form: Form): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            form.endCurrentForm().then(
                () =>
                {
                    resolve();
                },
                (reason: ServerResponse) =>
                {
                    this.rejectionHandler(reason, reject);
                });
        });
    }

    // ******** Form Rows **********

    public getLocalRows(form: Form)
    {
        return form.rows;
    }
    private setLocalRows(form: Form, rows: any, isMerge: boolean)
    {
        if (isMerge)
        {
            form.rows = Object.assign(form.rows, rows);
        }
        else
        {
            form.rows = rows;
        }
    }
    private clearLocalRows(form)
    {
        form.rows = {};
    }

    /** Returns items of selected entity, starting from a wanted row according to a filter */
    getRows(form: Form, fromRow: number, isMerge: boolean = true): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            form.getRows(fromRow).then(
                result =>
                {
                    this.setLocalRows(form, result[form.name], isMerge);
                    resolve(result[form.name]);
                },
                (reason: ServerResponse) =>
                {
                    this.rejectionHandler(reason, reject);
                });
        });
    }
    /**Clears rows of a given form and then retrieves new ones. */
    getRowsAndReplace(form: Form): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            this.clearRows(form).then(
                result =>
                {
                    this.getRows(form, 1).then(
                        rows => { resolve(); },
                        (reason: ServerResponse) =>
                        {
                            this.rejectionHandler(reason, reject);
                        });
                },
                (reason: ServerResponse) =>
                {
                    this.rejectionHandler(reason, reject);
                });
        });
    }
    /**Clears rows of a given form. */
    clearRows(form: Form): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            form.clearRows().then(
                result =>
                {

                    this.clearLocalRows(form);
                    resolve();
                },
                (reason: ServerResponse) =>
                {
                    this.rejectionHandler(reason, reject);
                });
        });
    }
    /**Delets a list row with the given index. */
    deleteListRow(form: Form, rowInd): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            this.setActiveRow(form, rowInd).then(
                res =>
                {
                    this.deleteRow(form).then(
                        res => { resolve(); },
                        (reason: ServerResponse) => { this.rejectionHandler(reason, reject); });
                },
                (reason: ServerResponse) => { this.rejectionHandler(reason, reject); });
        });
    }

    // ******** Form Row **********

    public getFormRow(form: Form, rowInd)
    {
        return form.rows[rowInd];
    }
    public setIsRowChangesSaved(form: Form, rowInd, isSaved: boolean)
    {
        form.rows[rowInd].isChangesSaved = isSaved;
    }
    public getIsRowChangesSaved(form: Form, rowInd)
    {
        if (form.rows[rowInd] === undefined)
        {
            return true;
        }
        return form.rows[rowInd].isChangesSaved;
    }
    private addFormRow(form: Form, newRowInd)
    {
        form.rows[newRowInd] = { isNewRow: true };
    }
    public getIsNewRow(form: Form, rowInd)
    {
        return form.rows[rowInd].isNewRow;
    }
    private setNotNewRow(form: Form, rowInd)
    {
        delete form.rows[rowInd].isNewRow;
    }
    public deleteLastFormRow(form: Form)
    {
        let lastInd = Object.keys(form.rows).length;
        this.deleteLocalRow(form, lastInd);
    }
    private deleteLocalRow(form: Form, rowInd)
    {
        delete form.rows[rowInd];
    }

    /** Sets the selected items row */
    setActiveRow(form: Form, rowInd): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            form.setActiveRow(rowInd).then(
                result =>
                {

                    resolve();
                },
                (reason: ServerResponse) =>
                {
                    this.rejectionHandler(reason, reject);
                });
        });
    }
    /** Updates fields values after the current field lost focus, 
     * according to data returned from the server */
    updateField(form: Form, newValue, columnName): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            if (newValue == null || columnName == null)
            {
                resolve();
                return;
            }

            form.fieldUpdate(columnName, newValue).then(
                result =>
                {
                    resolve();
                },
                (reason: ServerResponse) =>
                {
                    this.rejectionHandler(reason, reject);
                });
        });
    }
    /** Saves changes made in the current row */
    saveRow(form: Form, rowInd, isBackToPrevForm: number): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            form.saveRow(isBackToPrevForm).then(
                result =>
                {
                    this.setIsRowChangesSaved(form, rowInd, true);
                    this.setNotNewRow(form, rowInd);

                    resolve();
                },
                (reason: ServerResponse) =>
                {
                    this.rejectionHandler(reason, reject);
                });
        });
    }
    /** Undoes changes made in the current row */
    undoRow(form: Form): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            form.undo().then(
                result =>
                {
                    resolve();
                },
                (reason: ServerResponse) =>
                {
                    this.rejectionHandler(reason, reject);
                });
        });
    }
    /** Creats a new row and adds it to the given form. */
    newRow(form: Form): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            form.newRow().then(
                (newRow) =>
                {
                    //maybe format should be changed in api
                    let newRowInd = newRow.rowindex;
                    this.addFormRow(form, newRowInd);
                    resolve(newRowInd);
                },
                (reason: ServerResponse) =>
                {
                    this.rejectionHandler(reason, reject);
                });
        });
    }
    /** Delets the current row from the given form.*/
    deleteRow(form: Form): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            form.delRow().then(
                result =>
                {
                    // 'rowIndex' is the index of the last row which was already deleted in 'updateFormsData'.
                    //  Here we just need to update the local rows object.
                    if (result)
                    {
                        let rowInd = result.rowindex;
                        this.deleteLocalRow(form, rowInd.toString());
                    }
                    resolve();
                },
                (reason: ServerResponse) =>
                {
                    this.rejectionHandler(reason, reject);
                });
        });
    }


    // ************ Search and Choose *************

    /** Opens a Search or a Choose list according to the current field.
     * If there was a value in the fileld the returned list will contain results matching this value.
     * Active row must be set before opening Search or Choose!!!
     */
    openSearchOrChoose(form: Form, colName, fieldVal): Promise<any>
    {

        return new Promise((resolve, reject) =>
        {
            form.choose(colName, fieldVal).then(
                (result) =>
                {
                    resolve(result);
                },
                (reason: ServerResponse) =>
                {
                    this.rejectionHandler(reason, reject);
                });
        });

    }
    /** Returns search results for the given value. */
    search(form: Form, val): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            form.searchAction(4, val).then(
                result =>
                {
                    resolve(result.SearchLine);
                },
                (reason: ServerResponse) =>
                {
                    this.rejectionHandler(reason, reject);
                });
        });
    }

    // ************ SubForms *************

    /**Starts 'subformName' subForm. */
    startSubform(parentForm: Form, subformName: string, onWarnings = null): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            let onErrorOrWarning;
            if (onWarnings == null)
            {
                onErrorOrWarning = this.errorAndWarningMsgHandler;
            }
            else
            {
                onErrorOrWarning = onWarnings;
            }
            let updateFormsData = (result) => { this.updateFormsData(result, parentForm) };
            parentForm.startSubForm(subformName,
                onErrorOrWarning,
                updateFormsData,
                (subform: Form) =>
                {
                    this.mergeForm(subform, parentForm);
                    resolve(this.getForm(subform.name, parentForm));
                },
                (reason: ServerResponse) =>
                {
                    this.rejectionHandler(reason, reject);
                });
        });
    }
    /** Starts 'subformName' subForm and retrieves its rows. */
    startSubFormAndGetRows(parentForm: Form, subformName, onWarnings = null): Promise<Form>
    {
        return new Promise((resolve, reject) =>
        {
            this.startSubform(parentForm, subformName, onWarnings).then(
                (subform: Form) =>
                {
                    this.getRows(subform, 1, false).then(
                        rows =>
                        {
                            resolve(subform);
                        },
                        (reason: ServerResponse) => 
                        {
                            this.endForm(subform).then(
                                () =>
                                {
                                    this.rejectionHandler(reason, reject);
                                },
                                reason =>
                                {
                                    this.rejectionHandler(reason, reject);
                                });
                        });
                },
                (reason: ServerResponse) => 
                {
                    this.rejectionHandler(reason, reject);
                });
        })
    }

    /**
     * Starts sub form.
     * Then gets its rows.
       Then ends subform.
       Then starts the next sub form if exists.
     */
    getOneSubForm(parentForm: Form, subformNames: string[], index: number, subforms, resolve, reject)
    {
        let onErrorOrWarning = (serverMsg: ServerResponse) =>
        {
            if (serverMsg.type == ServerResponseType.Warning)
            {
                //always approve warnings when open subform one after the other.
                serverMsg.form.warningConfirm(1);
            }
            else
            {
                this.errorAndWarningMsgHandler(serverMsg);
            }
        }
        let subformName = subformNames[index];
        this.startSubFormAndGetRows(parentForm, subformName, onErrorOrWarning).then(
            (subform: Form) =>
            {
                this.endForm(subform).then(
                    res =>
                    {
                        let nextIndex = index + 1;
                        subforms[subformName] = subform;
                        if (subformNames[nextIndex] != null)
                        {
                            this.getOneSubForm(parentForm, subformNames, nextIndex, subforms, resolve, reject);
                        }
                        else
                        {
                            resolve(subforms);
                        }
                    },
                    (reason: ServerResponse) =>
                    {
                        this.rejectionHandler(reason, reject);
                    });
            },
            (reason: ServerResponse) =>
            {
                this.rejectionHandler(reason, reject);
            });
    }
    /** Gets a form and initializes its subforms if it has any.
     * If the wanted row is not a new one, subforms rows will be retrieved as well.  */
    getSubForms(form: Form, subformNames: string[], rowInd): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            //let subformNames = Object.keys(form.subforms);
            if (subformNames.length == 0 || this.getIsNewRow(form, rowInd))
            {
                resolve();
            }
            else
            {
                this.getOneSubForm(form, subformNames, 0, {}, resolve, reject);
            }
        });
    }

    /** Clears subform rows of a specific item.
      * Should be called when leaving the details page */
    clearSubforms(subforms)
    {
        for (var subform in subforms)
        {
            this.clearLocalRows(subforms[subform]);
        }
    }
    /** Starts the wanted subform and sets the activeRow to the given index. */
    editSubFormRow(parentForm: Form, formName, rowInd): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            this.startSubform(parentForm, formName).then(
                subform =>
                {
                    if (rowInd != null)
                    {
                        this.setActiveRow(subform, rowInd).then(
                            result =>
                            {
                                resolve();
                            },
                            (reason: ServerResponse) => { this.rejectionHandler(reason, reject); });
                    }
                    else
                    {
                        resolve();
                    }
                },
                (reason: ServerResponse) => { this.rejectionHandler(reason, reject); });
        });
    }
    /** Starts the wanted subform and creates a new row. */
    addNewSubFormRow(parentForm: Form, subformName): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            this.startSubform(parentForm, subformName).then(
                (subform: Form) =>
                {
                    this.newRow(subform).then(
                        newRowInd =>
                        {
                            resolve(newRowInd);
                        },
                        (reason: ServerResponse) =>
                        {
                            this.rejectionHandler(reason, reject);
                        });
                },
                (reason: ServerResponse) =>
                {
                    this.rejectionHandler(reason, reject);
                });
        });
    }
    /**
      * Deletes a subForm item according to the rowInd.
     1. Starts sub form
     2. Set item to be active
     3. Deletes item
     4. Ends sub form.
     */
    deleteSubFormListRow(parentForm: Form, subformName, rowInd): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {

            this.startSubform(parentForm, subformName).then(
                subform =>
                {
                    this.deleteListRow(subform, rowInd).then(
                        res =>
                        {
                            this.endForm(subform).then(
                                () =>
                                {
                                    resolve();
                                }, reason => { reject(reason); })
                        },
                        reason =>
                        {
                            this.endForm(subform);
                            reject(reason);
                        });
                }, reason => { reject(reason); });
        });
    }

    //************Filter ****************

    /** Builds a filter for a search string according to the columnNames (up to 4) */
    buildSearchFilter(form: Form, columnNames: string[], search: string)
    {
        let filter: Filter = {
            or: 1,
            ignorecase: 1,
            QueryValues: []
        }
        for (var col in columnNames)
        {
            let queryValue: QueryValue = {
                field: columnNames[col],
                fromval: search + '*',
                toval: '',
                op: '=',
                sort: 0,
                isdesc: 0
            }
            filter.QueryValues.push(queryValue);
        }
        if (filter.QueryValues.length == 0)
        {
            return null;
        }
        return filter;
    }

    /** Sets a filter on the form for a search string **/
    setFilter(form: Form, columnNames: string[], search: string): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            //replace * or % in the begining of search string so the search won't be too heavy
            search = search.replace(/^[\*|%]+/, '');
            if (search == null || search.trim() == '')
            {
                this.clearSearchFilter(form).then(() =>
                {
                    this.getRowsAndReplace(form).then(
                        rows =>
                        {
                            resolve(rows);
                        }, (reason: ServerResponse) => { this.rejectionHandler(reason, reject); });
                }, (reason: ServerResponse) => { this.rejectionHandler(reason, reject); });
            }
            else
            {
                let filter = this.buildSearchFilter(form, columnNames, search);
                if (filter == null)
                {
                    reject();
                }
                else
                {
                    this.setSearchFilter(form, filter).then(
                        () =>
                        {
                            this.getRowsAndReplace(form).then(
                                rows =>
                                {
                                    resolve(rows);
                                },
                                (reason: ServerResponse) => 
                                {
                                    this.rejectionHandler(reason, reject);
                                });
                        },
                        (reason: ServerResponse) => 
                        {
                            this.rejectionHandler(reason, reject);
                        });
                }
            }
        });
    }

    /** Clears search filter for the current form **/
    clearSearchFilter(form: Form): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            form.clearSearchFilter().then(
                () =>
                {

                    resolve();
                },
                (reason: ServerResponse) =>
                {
                    this.rejectionHandler(reason, reject);

                });
        });
    }

    /** Sets search filter for rows retrievel **/
    setSearchFilter(form: Form, filter: Filter)
    {
        return new Promise((resolve, reject) =>
        {
            form.setSearchFilter(filter).then(
                () =>
                {

                    resolve();
                },
                (reason: ServerResponse) =>
                {
                    this.rejectionHandler(reason, reject);

                });
        });
    }
    //************ Text *********************/
    /** Saves text to a text form
      * Adds the text to the existing text with the date + signiture */
    saveText(form: Form, text): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            form.saveText(text, 1, 1, 0).then(
                (result) =>
                {
                    resolve();
                },
                (reason: ServerResponse) =>
                {
                    this.rejectionHandler(reason, reject);

                });
        });
    }
    // ************** Files *********************

    /** Uploads a single file (from javascript FileList object) */
    uploadFile(form: Form, file): Observable<any>
    {
        return Observable.create(observer =>
        {
            let onFulfilled = result =>
            {
                observer.next(result);
            };
            let onRejected = (reason: ServerResponse) =>
            {
                this.rejectionHandler(reason, observer.error);
            };
            form.uploadFile(file, onFulfilled, onRejected);
        });
    }
    /** Uploads an image as data-url 
      * recives the data and its type */
    uploadImage(form: Form, imageData: string, type: string): Observable<any>
    {
        return Observable.create(observer =>
        {
            let onsuccess = result =>
            {
                observer.next(result);
            };
            let onerror = () =>
            {
                observer.error();
            };
            form.uploadDataUrl(imageData, type, onsuccess, onerror);
        });
    }
    /** Cancels file or image upload. */
    cancelUpload(form: Form)
    {
        form.cancelFileUpload();
    }
    /** Gets a relative path of a file and returns its full path. */
    getFileUrl(form: Form, currentSrc): any
    {
        if (form == null)
            return "#";
        return form.getFileUrl(currentSrc);
    }

    // ************** Direct Activations *********************

    /**
     * Executes a direct activation 'activationName'.
     * @param {Form} form 
     * @param {string} activationName 
     * @param {string} type 
     * 
     * @memberOf FormService
     */
    executeDirectActivation(form: Form, activationName: string, type: string): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            form.activateStart(activationName, type, this.procService.procProgress)
                .then(data => 
                {
                    return this.procService.procSuccess(data)
                })
                .then(() => 
                {
                    return form.activateEnd();
                })
                .then(() =>
                {
                    return resolve();
                })
                .catch(reason =>
                {
                    if (reason)
                        form.activateEnd().then(() => this.rejectionHandler(reason, reject));
                    else
                        this.messageHandler.showErrorOrWarning(true, Constants.activationNotSupported);
                });
        });
    }
}//end of formService





