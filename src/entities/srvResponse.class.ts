import { Form } from "./form.class";
export interface ServerResponse
{
    form: Form;
    message: string;
    /**Indicates whether the response is a fatal error or not. */
    fatal: boolean;

    /**Gives more information about the message type. Could be one of 'ServerResponseType'.*/
    type: string;

    /**Gives more information about the message type. Could be one of 'ServerResponseCode'.*/
    code: string;
}