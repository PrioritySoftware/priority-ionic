export declare class LoginFunctions
{
    apiVersion(onSuccess?, onError?);
    /**
	 * Used for retrieving companies and groups information.
	 * @param {ChooseSuccessCallback} onSuccess - called on success.  
	 * @param {ChooseErrorCallback} onError - called on error.      
	 */
    companies(onSuccess?, onError?);
	/**
	 * Used for retrieving Priority's constants.
	 * @param {ChooseSuccessCallback} onSuccess - called on success. 
	 * @param {ChooseErrorCallback} onError - called on error.     
	 */
    constants(onSuccess?, onError?);
    /**
	 * Used for retrieving messages of a certain entity in Priority.
	 * @param {string} ename - Name of entity.
	 * @param {string} type - Type of entity
	 * @param {number} form - Starting range messages 
	 * @param {number} to - Ending Number of message 
	 * @param {ChooseSuccessCallback} onSuccess - called on success.
	 * @param {ChooseErrorCallback} onError - called on error.    
	 */
    entMessages(ename, type, form, to, onSuccess?, onError?);
    priorityVersion(onSuccess?, onError?);
}