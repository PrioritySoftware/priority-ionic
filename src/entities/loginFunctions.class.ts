export declare class LoginFunctions
{
    apiVersion(onSuccess?, onError?);
    /**  companies - return array companies */
    companies(onSuccess?, onError?);
    constants(onSuccess?, onError?);
    /**
	 * get entity's messages.
	 * @param {string} ename - Name of entity.
	 * @param {string} type - Type of entity
	 * @param {number} form - Starting range messages 
	 * @param {number} to - Ending Number of message 
	 * @param {ChooseSuccessCallback} onSuccess - called on success.
	 * @param {ChooseErrorCallback} onError - called on error.    
	 * @instance 
	 */
    entMessages(ename, type, form, to, onSuccess?, onError?);
    priorityVersion(onSuccess?, onError?);
}