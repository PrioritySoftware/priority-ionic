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
    
    /**
     * Function to call when the item representing the column is clicked.
     * @memberOf ColumnOptions
     */
    click?;
    
    /**
     * Avatar image src - in case the column's value should be displayed as an avatar.
     * @memberOf ColumnOptions
     */
    avatar?;
    /**
     * icon name - one of ionicons
     * @memberOf ColumnOptions
     */
    icon?: string;
    subtype?: string;
}