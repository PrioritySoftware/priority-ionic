import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Constants } from "../constants.config";
import { Configuration } from "../entities/configuration.class";
import { ServerResponse } from "../entities/srvResponse.class";
import { LoginResult } from "../entities/loginResult.class";
import { PriorityService } from "../services/priority.service";

@Injectable()
export class ConfigurationService
{
    configuration: Configuration;

    constructor(private platform: Platform, private priorityService:PriorityService) { }


    /* Initialization.*/
    config(config: Configuration)
    {
        this.configuration = config;
        if (config.language == 1)
        {
            Constants.setRtlTranslations();
            this.platform.setDir('rtl', false);
        }
        else
        {
            Constants.setLtrTranslations();
            this.platform.setDir('ltr', false);
        }
    }

    /** Login - must be after initialization(config). **/
    logIn(username: string, password: string): Promise<LoginResult>
    {
        return new Promise((resolve, reject) =>
        {
            this.configuration.username = username;
            this.configuration.password = password;
            this.priorityService.priority.login(this.configuration)
                .then(
                (result: LoginResult) =>
                {
                    resolve(result);
                })
                .catch((reason: ServerResponse) =>
                {
                    reject(reason);
                });
        });
    }

    /** changePassword  **/
    changePassword(newPwd : string, confirmNewPwd : string, oldPwd : string) : Promise<any>
    {
        return new  Promise((resolve, reject) =>
        {
            this.priorityService.priority.changePassword(newPwd, confirmNewPwd, oldPwd)
                .then(
                    (res : string)=>
                    {
                        resolve(res);
                    })
                    .catch((reason : ServerResponse) =>
                    {
                        reject(reason);
                    });
            
        });
    }

}