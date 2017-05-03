export class ProcStepType
{

    /**
     * A procedure step that includes input fileds.
     * @static
     * @memberOf ProcStepType
     */
    public static InputFields = "inputFields";
        /**
     * A procedure step that includes choose/search fileds.
     * @static
     * @memberOf ProcStepType
     */
    public static InputOptions="inputOptions";
        /**
     * A procedure step that shows a help dialog
     * @static
     * @memberOf ProcStepType
     */
    public static InputHelp="inputHelp";
        /**
     * A procedure step for when the procedure sends a message.
     * @static
     * @memberOf ProcStepType
     */
    public static Message="message";
        /**
     * A procedure step for handling a new report options.
     * @static
     * @memberOf ProcStepType
     */
    public static ReportOptions="reportOptions";
        /**
     * A procedure step for handling a new document options.
     * @static
     * @memberOf ProcStepType
     */
    public static DocumentOptions="documentOptions";
        /**
     * A procedure step for handling a report display as a html file.
     * @static
     * @memberOf ProcStepType
     */
    public static DisplayUrl="displayUrl";
        /**
     * Indicates the procedure has finished.
     * @static
     * @memberOf ProcStepType
     */
    public static End="end";


}