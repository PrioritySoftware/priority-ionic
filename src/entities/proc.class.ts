export declare class Proc
{
    title:string;
    name:string;
    /**
             * Call after a message is approved or canceled.
             * @param {number} ok - 1: OK, 0: Cancel (If only one button can send either).
             * @param {ProcSuccessCallback} successCallback - called on success.
             * @param {ProcProgressCallback} progressCallback - use to update progress bar (called only when the procedure starts a program
             * 													that reports progress).
             * @param {ProcErrorCallback} errorCallback - called on error.
             * @param {Object} userState - userState (An Object to be sent and returned as is)
             * @instance
             */
    message(ok, onSuccess?, onError?,userState?)
    	
    /**
     * Call after reportOptions step
     * @param {number} ok - 1: OK, 0: Cancel.
     * @param {number} selectedFormat - selected format.
     * @param {ProcSuccessCallback} successCallback - called on success.
     * @param {ProcProgressCallback} progressCallback - use to update progress bar (called only when the procedure starts a program
     * 													that reports progress).
     * @param {ProcErrorCallback} errorCallback - called on error.
     * @param {Object} userState - userState (An Object to be sent and returned as is)
     * @instance
     */
    documentOptions(ok, selectedFormat, onSuccess?, onError?) 
    	
    /**
     * Call after documentOptions step
     * @param {number} ok - 1: OK, 0: Cancel.
     * @param {number} selectedFormat - selected format.
     * @param {number} pdf - 1: PDF, 2: HTML.
     * @param {ProcSuccessCallback} successCallback - called on success.
     * @param {ProcProgressCallback} progressCallback - use to update progress bar (called only when the procedure starts a program
     * 													that reports progress).
     * @param {ProcErrorCallback} errorCallback - called on error.
     * @param {Object} userState - userState (An Object to be sent and returned as is)
     * @instance
     */
  
    	
    /**
     * Call after inputFields step
     * @param {number} ok - 1: OK, 0: Cancel.
     * @param {Object} data - Input fields data (JSON):
     * <pre>
     * {
     * 		EditFields: [
     * 		{
     * 			field: (number) - field ID
     * 			value: (string) - field value
     * 			op:	(number) - operator ID
     * 			value2: (string) - value2
     * 			op2: (number) - operator2 ID
     * 		}
     * 		...
     * 		]
     * }
     * </pre>
     * @param {ProcSuccessCallback} successCallback - called on success.
     * @param {ProcProgressCallback} progressCallback - use to update progress bar (called only when the procedure starts a program
     * 													that reports progress).
     * @param {ProcErrorCallback} errorCallback - called on error.
     * @param {Object} userState - userState (An Object to be sent and returned as is)
     * @instance
     */
    inputFields(ok, data, onSuccess?, onError?) 
    	
    /**
     * Call after inputOptions step
     * @param {number} ok - 1: OK, 0: Cancel.
     * @param {number} selection - selected option ID.
     * @param {ProcSuccessCallback} successCallback - called on success.
     * @param {ProcProgressCallback} progressCallback - use to update progress bar (called only when the procedure starts a program
     * 													that reports progress).
     * @param {ProcErrorCallback} errorCallback - called on error.
     * @param {Object} userState - userState (An Object to be sent and returned as is)
     * @instance
     */
    inputOptions(ok, selection, onSuccess?, onError?) 
    	
    /**
     * Call after inputHelp step
     * @param {number} ok - 1: OK, 0: Cancel.
     * @param {ProcSuccessCallback} successCallback - called on success.
     * @param {ProcProgressCallback} progressCallback - use to update progress bar (called only when the procedure starts a program
     * 													that reports progress).
     * @param {ProcErrorCallback} errorCallback - called on error.
     * @param {Object} userState - userState (An Object to be sent and returned as is)
     * @instance
     */
    inputHelp(ok, onSuccess?, onError?) 
    	
    /**
     * Call after every other step
     * @param {ProcSuccessCallback} successCallback - called on success.
     * @param {ProcProgressCallback} progressCallback - use to update progress bar (called only when the procedure starts a program
     * 													that reports progress).
     * @param {ProcErrorCallback} errorCallback - called on error.
     * @param {Object} userState - userState (An Object to be sent and returned as is)
     * @instance
     */
    continueProc(onSuccess?, onError?) 
    	
    /**
     * Cancel procedure.
     * @param {ProcSuccessCallback} successCallback - called on success.
     * @param {ProcProgressCallback} progressCallback - use to update progress bar (called only when the procedure starts a program
     * 													that reports progress).
     * @param {ProcErrorCallback} errorCallback - called on error.
     * @param {Object} userState - userState (An Object to be sent and returned as is)
     * @instance
     */
     cancel(onSuccess?, onError?) 
    	
    /**
           * @callback ProcOpenChooseCallback
           * @param {Object} result - A choose or search object
           * @param {Object} userState - userState
           */
    	
    /**
     * Open Choose or Search.
     * @param {number} fieldId - ID of field.
     * @param {string} value - current value in field.
     * @param {Object} data - Data in all fields (Choose/Search may be dependent on other fields values).
     * <pre>
     * {
     * 		ChooseFields: [
     * 		{
     * 			field: (number) - field ID
     * 			value: (string) - field value
     * 		}
     * 		...
     * 		]
     * }
     * </pre>
     * @param {ProcOpenChooseCallback} successCallback - called on success.
     * @param {ProcErrorCallback} errorCallback - called on error.
     * @param {Object} userState - userState (An Object to be sent and returned as is)
     * @instance
     */
    choose(fieldId, value, data, onSuccess?, onError?) 
			 
    /**
           * @callback ProcSearchActionCallback
           * @param {Object} result - A search object
           * @param {Object} userState - userState
           */
    	
    /**
     * Perform action in search dialog.
     * @param {number} fieldId - ID of field.
     * @param {string} value - current value in field.
     * @param {number} action - One of: Next(1),Prev(2),TypeChange(3),TextChange(4),StartChange(5),IgnoreCaseChanged(6)
     * @param {Object} data - Data in all fields (Search may be dependent on other fields values).
     * <pre>
     * {
     * 		ChooseFields: [
     * 		{
     * 			field: (number) - field ID
     * 			value: (string) - field value
     * 		}
     * 		...
     * 		]
     * }
     * </pre>
     * @param {ProcSearchActionCallback} successCallback - called on success.
     * @param {ProcErrorCallback} errorCallback - called on error.
     * @param {Object} userState - userState (An Object to be sent and returned as is)
     * @instance
     */
    searchAction(fieldId, value, action, data, onSuccess?, onError?) 
}