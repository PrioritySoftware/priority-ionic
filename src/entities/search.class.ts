import { SearchResult } from './searchResult.class';
export interface Search
{
    /**Search results. Each result is a 'searchResult.class'. */
    SearchLine:  SearchResult[];
    /**Choose results. Each result is a 'searchResult.class'. */
    ChooseLine: { [key: string]: SearchResult };
    title1: string;
    title2: string;

    /****************** For Search only*****************************/

    /**
     * The active search cursor. Could be one of :"By Name", "By Number", "By Foreign Name".
     * 
     * @type {string}
     * @memberof Search
     */
    cursor: string;

    /**
     * Indicates whether the search is performed ignoring case or not.
     * @memberof Search
     */
    ignorecase: number;


    /**
     * Indicates whether the search is a multi search - could more than one option be selected.
     * 
     * @memberof Search
     */
    ismulti;


    /**
     * Number of seearch results.
     * 
     * @memberof Search
     */
    lines: number;


    /**
     * 
     * Indicates whether there are more search results that were not returned. 
     * If 1 - a search action needs to be executed in order to get all results. Else - there are no more results.
     * @type {number}
     * @memberof Search
     */
    next: number;


    /**
     * Indicates whether the search is performed from the beginning of the word or  not.
     * @memberof Search
     */
    start;


    /**
     * Search value.
     * 
     * @memberof Search
     */
    value;
}