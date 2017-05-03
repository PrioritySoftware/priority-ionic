export interface Column
{
    /** @type {number} [description] */
    attachment: number;
    /** @type {number} Decimal percition. Used for decimal fields. */
    decimal: number;
    /** @type {string} [description] */
    format: string;
    /** @type {number} Is the field is mandatory. 0 or 1 */
    mandatory: number;
    /** @type {number} Fields max length. Used for text and number fields. */
    maxLength: number;
    /** @type {number} Is the field is a read-only field.  0 or 1 */
    readonly: number;
    /** @type {string} Fields text for display. */
    title: string;
    /** @type {string} Fileds type, one of: [number,date etc.] */
    type: string
    /** @type {string} Fields zoom type. Used for indicating if and what type of "zoom" can be made into the filed. */
    zoom: string;
     /** @type {string} Fields name. */
    key:string;
}