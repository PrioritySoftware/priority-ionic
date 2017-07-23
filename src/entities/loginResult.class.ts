export interface LoginResult
{
    /**
     * Used for retrieving companies and groups information.
     * @type {Function}
     * @memberof ItemOptions
     */
    companies: Function,
    /**
     * Used for retrieving messages of a certain entity in Priority.
     * enmae - entity name.
     * type - entity type.
     * from - the message number to retrieve from.
     * to- the message number to retrieve until.
     * 
     * @memberof ItemOptions
     */
    entMessages: (ename: string, type: string, from: number, to: number) => {},
    /**
     * Used for retrieving Priority's constants.
     * 
     * @type {Function}
     * @memberof ItemOptions
     */
    constants: Function
}