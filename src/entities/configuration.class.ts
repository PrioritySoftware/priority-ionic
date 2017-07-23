import { ProfileConfig } from "./profileConfig.class";
import { LoginFunctions } from "./loginFunctions.class";

export interface Configuration
{
	/** The server url */
    url: string;
    /** tabulaini */
    tabulaini: string;
    /** app language */
    language: number;
    /** app profile */
    profileConfig: ProfileConfig;
    /** app name - from json */
    appname: string;
    /** login username value */
    username?: string;
    /** login password value */
    password?: string;
    /** device uuid */
    devicename: string;
    /** functions the received in execution login **/
    loginFunctions?: LoginFunctions;
}