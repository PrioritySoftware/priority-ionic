export interface ColumnOptions
{
    /**
     * will only show column's with this property set to true.
     * 
     * @type {boolean}
     * @memberOf Column
     */
    isShow?: boolean;
    /**
     * 
     * will only show column's with this property set to true.
     * 
     * @memberOf Column
     */
    isShowTitle?: boolean;
    /**
     * You could define a column you'de like to concatenate it's value with.   
     * 
     * 
     * @memberOf Column
     */
    concat?: string;
    pos?: number;
    sortDirection?: number;
    click?;
    avatar?;
    iconName?: string;
    subtype?: string;
}