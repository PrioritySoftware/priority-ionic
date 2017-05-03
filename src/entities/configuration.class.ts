export interface Configuration
{
	/** The server url */
    url: string;
    /** tabulaini */
    tabulaini: string;
    /** app language */
    language: number;
    /** app company */
    company: string;
    /** app name - from json */
    appname: string;
    /** login username value */
    username?: string;
    /** login password value */
    password?: string;
    /** device uuid */
    devicename: string;
}