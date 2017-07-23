import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Constants } from "../constants.config";
import { Configuration } from "../entities/configuration.class";
import { ServerResponse } from "../entities/srvResponse.class";
import { ProfileConfig } from "../entities/profileConfig.class";
import { LoginFunctions } from "../entities/loginFunctions.class";
import { PriorityService } from "../services/priority.service";

@Injectable()
export class ConfigurationService
{
    configuration: Configuration;
    priorityVersion : number[];

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

    setProfileConfiguration(profileConfig : ProfileConfig)
    {
        this.configuration.profileConfig = profileConfig;
    }

    /** Login - must be after initialization(config). **/
    logIn(username: string, password: string): Promise<LoginFunctions>
    {
        return new Promise((resolve, reject) =>
        {
            this.configuration.username = username;
            this.configuration.password = password;
            this.priorityService.priority.login(this.configuration)
                .then(
                (loginFunctions : LoginFunctions) =>
                {
                    this.configuration.loginFunctions = loginFunctions;
                    resolve();
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

    getCompanies() : Promise<any>
    {
        return new Promise((resolve,reject)=>
        {
            if(!this.configuration.loginFunctions)
            {
                /**  No user login yet */
                reject();
                return;
            }
            this.configuration.loginFunctions.companies()
                .then(
                    (res)=>
                    {
                        resolve(res.Company);
                    }
                )
                .catch(
                    (reason : ServerResponse)=>
                    {
                        reject(reason);
                    }
                );
        });
    }

    getEntMessages(ename: string, type: string, from: number, to: number ) : Promise<any>
    {
        return new Promise((resolve,reject)=>
        {
            if(!this.configuration.loginFunctions)
            {
                /**  No user login yet */
                reject();
                return;
            }
            this.configuration.loginFunctions.entMessages(ename, type, from, to).then(
                (res)=>
                {
                    resolve(res.entMessages);
                }
            ).catch(
                (reason : ServerResponse)=>
                {
                    reject(reason);
                }
            );
        });
    }

}