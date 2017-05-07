import { Injectable } from '@angular/core';
import { Platform } from "ionic-angular";
import {Diagnostic} from 'ionic-native';
declare var window;

@Injectable()
export class PermissionsService
{
    permissions;
    permissionTypes;

    constructor(private platform: Platform)
    {
        if (window.cordova)
        {
            this.permissions = window.cordova.plugins.permissions;
            this.permissionTypes = {};
            this.permissionTypes["camera"] = this.permissions.CAMERA;
            //we could add here more types supported by the plugin
        }
    }

    /** Requests runtime permissions for android platform
      * Recives the permission to be requested as string (should be a key of the permissionTypes object)
      * Returns a promise:
      * Resolves for a non android platform
      * For android: resolves for accepted permission and rejects for permission denied. */
    requestPermission(permission: string): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            if (this.platform.is("android"))
            {
                let permissionType = this.permissionTypes[permission];
                this.permissions.hasPermission(permissionType,
                    status =>
                    {
                        if (status.hasPermission)
                        {
                            resolve();
                        }
                        else
                        {
                            //if there is no permission - request the permission
                            this.permissions.requestPermission(permissionType,
                                status =>
                                {
                                    if (status.hasPermission)
                                    {
                                        resolve();
                                    }
                                    else
                                    {
                                        reject();
                                    }
                                },
                                error => { reject(error); });
                        }
                    },
                    error => { reject(error); });
            }
            else if (this.platform.is("ios"))
            {
                if (permission == "camera")
                    this.checkIosCameraPermissions()
                        .then(() => resolve())
                        .catch(() => reject());
            }
            else
            {
                resolve();
            }
        })
    }
    /**
     * Checks whether 'Photo-Galery' permissions are granted in IOS. These permissions are required for the Camera to work.
     * 
     * @returns {Promise<any>} 
     * 
     * @memberof PermissionsService
     */
    checkIosCameraPermissions(): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            Diagnostic.getCameraAuthorizationStatus()
                .then((status) => 
                {
                    if (status == Diagnostic.permissionStatus.NOT_REQUESTED)
                    {
                        return Diagnostic.requestCameraAuthorization();
                    }
                    else
                    {
                        resolve();
                    }
                })
                .then(status =>
                {
                    if (status == Diagnostic.permissionStatus.GRANTED)
                        resolve();
                    else
                        reject();
                })
                .catch((err) =>  
                {
                    reject();
                });
        });
    }
}//end of permissionService

