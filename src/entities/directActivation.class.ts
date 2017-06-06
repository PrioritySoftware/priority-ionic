export interface DirectActivation
{
    /**
     * Indicates whether the direct activation should run in the background.
     * 1 - when calling 'activateEnd', form fields will be updated with whatever the direct activation changed.
     * 0 - the direct activation will run as a procedure with no care for the form.
     * @type {number}
     * @memberof DirectActivation
     */
    background: number;

    /**
     * If the value is 1 - indicates a message should be displayed before the direct activation starts running. 
     *                     Used for preventing the user to accidentally start running the direct activation.
     * Else - no message should be displayed.
     * @type {number}
     * @memberof DirectActivation
     */
    confirm: number;

    /**
     * Direct activation's title.
     * 
     * @type {string}
     * @memberof DirectActivation
     */
    title: string;
} 