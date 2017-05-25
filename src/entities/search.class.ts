import { SearchResult } from './searchResult.class';
export interface Search
{
    /**Search results. Each result is a 'searchResult.class'. */
    SearchLine: {[key:string] : SearchResult};
    /**Choose results. Each result is a 'searchResult.class'. */
    ChooseLine: {[key:string] : SearchResult};
    title1: string;
    title2: string;
}