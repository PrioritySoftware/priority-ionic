export class ServerResponseType
{
    /**Indicating there was an error message from Priority. */
    public static Error: string = "error";
     /**Indicating there was a warning message from Priority. */
    public static Warning: string = "warning";
     /**Indicating there was an information message from Priority. */
    public static Information: string = "information";
     /**Indicating there was a fatal error somewhere.
      * Could be a syntax error,API error,exception and so on. */
    public static APIError: string = "apiError";   
}