import { Component, Input, ViewChild } from '@angular/core';
import { ActionSheetController } from 'ionic-angular';
import { Camera } from "@ionic-native/camera";
import { FormService } from "../../services/form.service";
import { PermissionsService } from "../../services/permissions.service";
import { Constants } from '../../constants.config';
import { MessageHandler } from "../../popups/Message/message.handler";
import { ProgressBarHandler } from "../../popups/ProgressBar/progress-bar.handler";
import { Form } from '../../entities/form.class';
declare var window;

@Component({
    selector: 'file-uploader',
    template: `<input #fileInput type="file" capture (change)="fileChosen($event)"/>`
})

export class FileUploader
{
    uploadingFile: string;
    fileChosen: Function;
    photoTaken: Function;
    private actions = null;

    @Input('Form') form : Form;

    @ViewChild('fileInput') fileInput;

    constructor(private formService: FormService,
                private actionSheetCtrl: ActionSheetController,
                private messageHandler: MessageHandler,
                private progressBarHandler: ProgressBarHandler,
                private permissions: PermissionsService,
                private camera: Camera)
    {
        this.uploadingFile = Constants.loadingFile;
    }

    /** public function called by components to start an upload proccess */
    uploadFile(): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            /** Sets 'fileChosen' and 'photoTaken' to take care of the chosen file and the Promise,
             * so that when we are finished with handling the upload we will be able to resolve or reject the promise.
             */
            this.fileChosen = (event) =>
            {
                this.uploadChosenFile(event)
                    .then(
                    result =>
                    {
                        resolve(result);
                    })
                    .catch(() => reject());
            }
            //assign the afterUpload function to photo-taken
            this.photoTaken = (image) =>
            {
                this.upload(this.formService.uploadImage(this.form, image, "jpg")).then(
                    result =>
                    {
                        resolve(result);
                    })
                    .catch(() => reject());
            }

            this.openFileChooser();
        });
    }

    /** file chosen event handler */
    uploadChosenFile(event): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            var file = null;
            if (event.target && event.target.files && event.target.files.length > 0)
            {
                file = event.target.files[0];
                event.target.value = "";
            }
            if (file != null)
            {
                this.upload(this.formService.uploadFile(this.form, file)).then(
                    result =>
                    {
                        resolve(result);
                    },
                    () =>
                    {
                        reject();
                    });
            }
            else
            {
                reject();
            }
        });
    }

    /** Uploads a file or an image according to the upload action recieved.
      * Parameters: upload - the form service upload observable to subscribe (could be from uploadFile or from uploadImage)
      *             afterUplaod - a callback to be invoked when the upload is completed */
    upload(upload): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            this.progressBarHandler.present(
                {
                    progressText: this.uploadingFile,
                    cancel: this.cancelUpload
                });

            let subscribtion = upload.subscribe(
                res =>
                {
                    if (!res.isLast)
                    {
                        // If the upload is not complete, update the progressbar.
                        if (res.progress != 100)
                        {
                            this.progressBarHandler.updateProgVal(res.progress);
                        }
                    }
                    else
                    {
                        // If the upload is complete:
                        // 1) Unsubscribes.
                        subscribtion.unsubscribe();
                        // 2) Handles the upload result.
                        if (res.progress > 0)
                        {
                            this.progressBarHandler.updateProgVal(res.progress);
                            resolve(res);
                        }
                        else
                        {
                            //when progress is negative - the upload was cancled.
                            reject();
                        }
                        // 3) Dismisses the progressbar popOver.
                        this.progressBarHandler.dismiss();
                    }
                },
                () =>
                {
                    this.progressBarHandler.dismiss();
                    reject();
                });
        });
    }

    /** Opens the camera plugin according to the sourceType
      * and uploads the image */
    openCamera = (sourceType) =>
    {
        this.permissions.requestPermission("camera").then(
            () =>
            {
                this.camera.getPicture(
                    {
                        destinationType: this.camera.DestinationType.DATA_URL,
                        sourceType: sourceType,
                        correctOrientation: true
                    }).then(
                    image =>
                    {
                        this.photoTaken("data:image/jpeg;base64," + image);
                    },
                    err =>
                    {
                        this.messageHandler.showToast(Constants.cameraError);
                    });
            },
            error =>
            {
                this.messageHandler.showToast(Constants.cameraError);
            });
    }
    /** Opens an action sheet to select the file source (files,camera,photo-galery)
      * when running in browser - opens the file chooser */
    openFileChooser()
    {
        if (window.cordova)
        {
            let filesButton = {
                handler: () =>
                {
                    this.actions.dismiss();
                    setTimeout(() =>
                    {
                        this.fileInput.nativeElement.click();
                    }, 1000);
                },
                text: Constants.files,
                icon: "folder"
            };
            let cameraButton = {
                handler: () =>
                {
                    this.actions.dismiss();
                    this.openCamera(this.camera.PictureSourceType.CAMERA)
                },
                text: Constants.camera,
                icon: "camera",
            };
            let galeryButton = {
                handler: () =>
                {
                    this.actions.dismiss();
                    this.openCamera(this.camera.PictureSourceType.PHOTOLIBRARY)
                },
                text: Constants.photoGalery,
                icon: "images"
            };
            this.actions = this.actionSheetCtrl.create(
                {
                    cssClass: Constants.dirByLang,
                    buttons: [filesButton, cameraButton, galeryButton]
                });
            this.actions.present();
            this.actions.onDidDismiss(()=>
            {
                this.actions = null;    
            });
        }
        else
        {
            setTimeout(() =>
            {
                this.fileInput.nativeElement.click();
            }, 1000);
        }

    }

    //check and close if have action sheet to select the file source
    dismissActions() :boolean
    {
        if(this.actions)
        {
            this.actions.dismiss();
            return true;
        }
        return false;
    }

    /** Cancels the upload in progress */
    cancelUpload = () =>
    {
        this.formService.cancelUpload(this.form);
    }   


}