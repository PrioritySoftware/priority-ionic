import { Column } from "./column.class";
import { DirectActivation } from "./directActivation.class";
export declare class Form
{

	name: string;

	columns: { [key: string]: Column };

	ishtml: number;

	ishtmleditable: number;

	isquery: number;

	oneline: number;

	rows: Object;

	subForms: { [key: string]: Form };
	
	activations: { [key: string]: DirectActivation };

	title: string;

	/**
	 * @callback SetActiveRowSuccessCallback
	 */

	/**
	 * @callback SetActiveRowErrorCallback
	 * @param {string} errorMessage - Error message.
	 * @param {boolean} isFatal - Is fatal error.
	 */

	/**
	 * Goto row.
	 * @param {number} row - Row number.
	 * @param {SetActiveRowSuccessCallback} onSuccess - called on success.
	 * @param {SetActiveRowErrorCallback} onError - called on error.
	 * @instance
	 */
	setActiveRow(row, onSuccess?, onError?)

	/**
	 * @callback ChooseSuccessCallback
	 * @param {ResultObj} result - Choose Object/Search Object/null
	 * @param {String} type - "Choose" / "Search" / "None".
	 */

	/**
	 * @callback ChooseErrorCallback
	 * @param {string} errorMessage - Error message.
	 * @param {boolean} isFatal - Is fatal error.
	 */

	/**
	 * Open choose/search in specified field.     
	 * @param {string} fieldName - Name of field (for example CUSTNAME).
	 * @param {string} fieldVale - Current value in field.
	 * @param {ChooseSuccessCallback} onSuccess - called on success.
	 * @param {ChooseErrorCallback} onError - called on error.    
	 * @instance 
	 */
	choose(fieldName, fieldValue, onSuccess?, onError?)

	/**
	 * @callback SearchActionSuccessCallback
	 * @param {ResultObj} result - Search object.
	 */

	/**
	 * @callback SearchActionErrorCallback
	 * @param {string} errorMessage - Error message.
	 * @param {boolean} isFatal - Is fatal error.
	 */

	/**
	 * Perform an action in search dialog.
	 * @param {number} action - One of: Next(1),Prev(2),TypeChange(3),TextChange(4),StartChange(5),IgnoreCaseChanged(6)
	 * @param {string} searchText - the text to search for.
	 * @param {SearchActionSuccessCallback} onSuccess - called on success.
	 * @param {SearchActionErrorCallback} onError - called on error.
	 * @instance
	 */
	searchAction(action, searchText, onSuccess?, onError?)

	/**
	 * @callback FieldUpdateSuccessCallback
	 * @param {ResultObj} result - result object.
	 */

	/**
	 * @callback FieldUpdateErrorCallback
	 * @param {string} errorMessage - Error message.
	 * @param {boolean} isFatal - Is fatal error.
	 */

	/**
	 * Update value in field.
	 * @param {string} fieldName - Name of field.
	 * @param {string} fieldValue - Current value in field.
	 * @param {FieldUpdateSuccessCallback} onSuccess - called on success.
	 * @param {FieldUpdateErrorCallback} onError - called on error.
	 * @instance
	 */
	fieldUpdate(fieldName, fieldValue, onSuccess?, onError?)

	/**
	 * Approve a warning message.
	 * @param {WarningSuccessCallback} onSuccess - called on success.
	 * @param {WarningErrorCallback} onError - called on error.
	 * @instance
	 */
	warningConfirm(ok)

	/**
	 * Approve an information message.
	 * @param {WarningSuccessCallback} onSuccess - called on success.
	 * @param {WarningErrorCallback} onError - called on error.
	 * @instance
	 */
	infoMsgConfirm();

	/**
	 * @callback SaveRowSuccessCallback
	 * @param {ResultObj} result - result object.
	 */

	/**
	 * @callback SaveRowErrorCallback
	 * @param {string} errorMessage - Error message.
	 * @param {boolean} isFatal - Is fatal error.
	 */

	/**
	 * Save changes in current active row.
	 * @param {number} backToParentForm - 0: stay in current row after save, 1: For Sub-Form only. go back to parent form and set active row to parent row.
	 * @param {SaveRowSuccessCallback} onSuccess - called on success.
	 * @param {SaveRowErrorCallback} onError - called on error.
	 * @instance
	 */
	saveRow(backToParentForm, onSuccess?, onError?)

	/**
  * @callback StartSubFormSuccessCallback
  * @param {ResultObj} result - result object.
  */

	/**
	 * @callback StartSubFormErrorCallback
	 * @param {string} errorMessage - Error message.
	 * @param {boolean} isFatal - Is fatal error.
	 */

	/**
   * Starts a Sub-Form and sets the position of the active row to the first row of the Sub-Form.
   * @param {string} formName - for example: ORDERITEMS.
   * @param {StartSubFormSuccessCallback} onSuccess - called on success.
   * @param {StartSubFormErrorCallback} onError - called on error.
   * @instance
   */
	startSubForm(formName, onErrorOrWarning, updateOtherFileds, onSuccess?, onError?)

	/**
	* @callback GetRowsSuccessCallback
	* @param {ResultObj} result - result object.
	*/

	/**
	 * @callback GetRowsErrorCallback
	 * @param {string} errorMessage - Error message.
	 * @param {boolean} isFatal - Is fatal error.
	 */

	/**
	 * Returns rows data of current form.
	 * Note: GetRows without a filter returns rows that have already been retrieved. It doesn't retrieve new rows.
	 * @param {number} fromRow - The position of the first row to be retrieved.
	 * @param {GetRowsSuccessCallback} onSuccess - called on success.
	 * @param {GetRowsErrorCallback} onError - called on error.
	 * @instance
	 */
	getRows(fromRow, onSuccess?, onError?)

	/**
  * @callback NewRowSuccessCallback
  * @param {ResultObj} result - result object.
  */

	/**
	 * @callback NewRowErrorCallback
	 * @param {string} errorMessage - Error message.
	 * @param {boolean} isFatal - Is fatal error.
	 */

	/**
   * Opens a new row in the current form. Set the position of the active row to this row.
   * @param {NewRowSuccessCallback} onSuccess - called on success.
   * @param {NewRowErrorCallback} onError - called on error.
   * @instance
   */
	newRow(onSuccess?, onError?)

	/**
	* @callback EndCurrentFormSuccessCallback
	* @param {ResultObj} result - result object.
	*/

	/**
	 * @callback EndCurrentFormErrorCallback
	 * @param {string} errorMessage - Error message.
	 * @param {boolean} isFatal - Is fatal error.
	 */

	/**
	 * Exits the current form. On a Sub-Form sets the active row to the parent row.
	 * @param {EndCurrentFormSuccessCallback} onSuccess - called on success.
	 * @param {EndCurrentFormErrorCallback} onError - called on error.
	 * @instance
	 */
	endCurrentForm(onSuccess?, onError?)

	/**
  * @callback UndoSuccessCallback
  * @param {ResultObj} result - result object.
  */

	/**
	 * @callback UndoErrorCallback
	 * @param {string} errorMessage - Error message.
	 * @param {boolean} isFatal - Is fatal error.
	 */

	/**
   * Undo unsaved changes in current row.
   * @param {UndoSuccessCallback} onSuccess - called on success.
   * @param {UndoErrorCallback} onError - called on error.
   * @instance
   */
	undo(onSuccess?, onError?)

	/**
	* @callback DelRowSuccessCallback
	* @param {ResultObj} result - result object.
	*/

	/**
	 * @callback DelRowCallback
	 * @param {string} errorMessage - Error message.
	 * @param {boolean} isFatal - Is fatal error.
	 */

	/**
	 * Deletes current row.
	 * @param {DelRowSuccessCallback} onSuccess - called on success.
	 * @param {DelRowErrorCallback} onError - called on error.
	 * @instance
	 */
	delRow(onSuccess?, onError?)

	/**
   * @callback ClearRowsSuccessCallback
   * @param {ResultObj} result - result object.
   */

	/**
	 * @callback ClearRowsErrorCallback
	 * @param {string} errorMessage - Error message.
	 * @param {boolean} isFatal - Is fatal error.
	 */

	/**
   * Clear all rows in a top level form. Doesn't delete rows!
   * @param {ClearRowsSuccessCallback} onSuccess - called on success.
   * @param {ClearRowsErrorCallback} onError - called on error.
   * @instance
   */
	clearRows(onSuccess?, onError?)

	/**
   * @callback SetSearchFilterSuccessCallback 
   */

	/**
	 * @callback SetSearchFilterErrorCallback
	 * @param {string} errorMessage - Error message.
	 * @param {boolean} isFatal - Is fatal error.
	 */

	/**
   * Sets a search filter in top level form.
   * Following calls to GetRows() funcNametion will use this filter until cleared or replaced by another filter.
   * @param {Object} filter - the filter is an Object of the form:
   * {
   * 	or: (number),
   * 	QueryValues:
   * 	[{
   * 		field: (string),
   * 		fromval: (string),
   * 		toval:	(string),
   * 		op:	(string),
   * 		sort: (number),
   * 		isdesc: (number),
   * 	},
   * 	{
   * 		...
   * 	}]
   * }
   * 	
   * or: 0: and, 1: or (operator to be used between ALL conditions).
   * field: field name (for example: CUSTNAME)
   * fromval: value
   * toval: to value - if tovalue is not empty then condition is always: field >= fromval AND field <= toval,
   * 					 if tovalue is empty, then condition is: field op fromval.
   * op: one of "=", "<", "<=", ">", ">=", "<>"
   * sort: 0: no sort, 1: sort
   * isdesc: 0: ASC, 1: DESC
   *  
   * Note: Filter MUST include all fields.
   * Note: every field can appear only once in the filter.
   * Note: The search is from the beginning of form field values. 
   * 		 values such as "*100", the "*" in the beginning will be ignored.  
   * 
   * @param {SetSearchFilterSuccessCallback} onSuccess - called on success.
   * @param {SetSearchFilterErrorCallback} onError - called on error.
   * @instance
   */
	setSearchFilter(filter, onSuccess?, onError?)

	/**
	   * @callback SetSimpleSearchFilterSuccessCallback
	   */

	/**
	 * @callback SetSimpleSearchFilterErrorCallback
	 * @param {string} errorMessage - Error message.
	 * @param {boolean} isFatal - Is fatal error.
	 */

	/**
   * Sets a simple search filter in top level form.
   * Following calls to GetRows() funcNametion will use this filter until cleared or replaced by another filter.
   * 
   * Note: The search is from the beginning of form field values. 
   * 		 values such as "*100", the "*" in the beginning will be ignored.
   * 
   * @param {string} filter - string to be searched for in the fields marked as search fields. 
   * @param {SetSimpleSearchFilterSuccessCallback} onSuccess - called on success.
   * @param {SetSimpleSearchFilterErrorCallback} onError - called on error.
   * @instance
   */
	setSimpleSearchFilter(filter, onSuccess?, onError?)

	/**
   * @callback ClearSearchFilterSuccessCallback
   */

	/**
	 * @callback ClearSearchFilterErrorCallback
	 * @param {string} errorMessage - Error message.
	 * @param {boolean} isFatal - Is fatal error.
	 */

	/**
   * Clears search filter for the top level form.
   * Following calls to GetRows() will not use a filter.
   * 
   * @param {ClearSearchFilterSuccessCallback} onSuccess - called on success.
   * @param {ClearSearchFilterErrorCallback} onError - called on error.
   * @instance
   */
	clearSearchFilter(onSuccess?, onError?)

	uploadFile(file, onSuccess?, onError?)
	uploadDataUrl(dataUrl: string, type: string, onSuccess?, onError?)
	getFileUrl(file): any
	cancelFileUpload()
	saveText(text: string, addFlag: number, signatureFlag: number, secondaryLangFlag: number, onSuccess?, onError?)
	isAlive(onSuccess?, onError?)

	/**
	 * Starts a Direct activation.
	 * 
	 * @param {string} ename 
	 * @param {string} type 
	 * @param {ProgressCallback} progressCallback 
	 * @param {DirectActSuccessCallback} [onSuccess] 
	 * @param {DirectActErrorCallback} [onError] 
	 * 
	 * @memberOf Form
	 */
	activateStart(ename: string, type: string, progressCallback, onSuccess?, onError?)
	/**
	 * Should be called after a direct activation has finished. Used for refreshing a fomr’s data.
	 * 
	 * @param {any} [onSuccess] 
	 * @param {any} [onError] 
	 * 
	 * @memberOf Form
	 */
	activateEnd(onSuccess?, onError?)
}