export class ServerResponseCode
{
    /**There was an attempt to add text in a no-text form. */
    public static NoHtml: string = "noHtml";

    /** There was an attempt to save text in a read-only form. */
    public static ReadOnlyForm: string = "readOnlyForm";

    /** There was an attempt to save a text that was too long. */
    public static TextTooLong: string = "textTooLong";

    /** There was an attempt to perform an action in some forms row 
     * before saving/discarding changed in the current row. */
    public static MustSaveOrDiscard: string = "mustSaveOrDiscard";

    /** There was an API exceptionץ */
    public static Exception: string = "exception";

    /** There was an attempt to call 'clearRows' on a subform. */
    public static NoClearOnSubForm: string = "noClearOnSubForm";

    /** The file sent to the upload function was null. */
    public static FileIsNull: string = "fileIsNull";

    /** There was an attempt to perform an action on  a not-existing subform. */
    public static NoSuchSubForm: string = "noSuchSubForm";

    /** There was an attempt to perform an action on  a not-existing column. */
    public static NoSuchColumn: string = "noSuchColumn";

    /** The previous API request was deleted from the request-queue, meaning it was rejected. */
    public static FailedPreviousRequest: string = "failedPreviousRequest";

    /** The user canceled a warning message that came from Priority. */
    public static WarningCancel: string = "warningCancel";

    /** Login failed. */
    public static LoginFailed: string = "loginFailed";
    /** The filter for rows retrivial is wrong. */
    public static InvalidFilter: string = "invalidFilter";

    /** Text forms - the text is already being edited somewhere else. */
    public static ReadWrite: string = "readWrite";

    /** The current API request was stoped.  */
    public static Stop: string = "stop";

    /** The error when calling a function that is not supported in the Priority version  */
    public static NotSupport : string = "notSupportedInThisPriorityVersion";

    /**  The error occurs when logging in with an expired password   */
    public static LoginExpired : string = "loginExpired";
}