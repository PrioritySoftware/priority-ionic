import { Injectable } from '@angular/core';
import { Constants } from "../constants.config";
import { Configuration } from "../entities/configuration.class";
import { ServerResponse } from "../entities/srvResponse.class";
// import * as priority from 'priority-web-sdk';
declare var login;

@Injectable()
export class ConfigurationService
{
    configuration: Configuration;

    constructor() { }


    /* Initialization.*/
    config(config: Configuration)
        {
            this.configuration = config;
        if (config.language == 1)
            {
                Constants.setRtlTranslations();
            }
            else
            {
                Constants.setLtrTranslations();
            }
    }

    /** Login - must be after initialization(config). **/
    logIn(username: string, password: string): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            this.configuration.username = username;
            this.configuration.password = password;
            login(this.configuration,
                () =>
                {
                    resolve();
                },
                (reason: ServerResponse) =>
                {
                    reject(reason.message);
                });
        });
    }

}