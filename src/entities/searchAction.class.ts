export class SearchAction
{
    /**
     * Retrieve more search results.
     * @static
     * @type {number}
     * @memberof SearchAction
     */

    static Next: number = 1;
    /**
     * Retrieves the previous search results. Usually, this action is unnecessary, as previously retrieved results are cached locally. 
     * @static
     * @type {number}
     * @memberof SearchAction
     */
static Prev: number = 2;

    /**
     * Change the ‘search-by’ method. Available methods are: By Name, By Number, By Foreign Name.
     * @static
     * @type {number}
     * @memberof SearchAction
     */
    static TypeChange: number = 3; 

    /**
     * Changes the search query text.
     * @static
     * @type {number}
     * @memberof SearchAction
     */
    static TextChange: number = 4;
    
    /**
     * Specifies that the search should look for results that start with the query text.
     * @static
     * @type {number}
     * @memberof SearchAction
     */
    static StartChange: number = 5;

    /**
     * When running a search in English (or other languages with uppercase and lowercase), toggles the ‘ignoreCase’ flag on or off.
     * @type {number}
     * @memberof SearchAction
     */
    staticIgnoreCaseChanged: number = 6;
}