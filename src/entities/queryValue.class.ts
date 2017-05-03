export interface QueryValue
{
	/** Field name */
    field: string;
    /** From value to filter */
    fromval: string;
    /** Until value to filter */
    toval: string;
    /** Filter operator. could be one of [= >= <= > <]  */
    op: string;
    /** Define if should sort rows by this query. could be 0 or 1 */
    sort: number;
    /** Define sort rows by desc. could be 0 or 1 */
    isdesc: number;
}