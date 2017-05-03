import { QueryValue } from "./queryValue.class"
export interface Filter
{
    /** Define if operator between query values is OR. for OR should be 1, for AND ahould be 0 */
    or: number;
    /** Define if filter should ignore case. could be 0 or 1 */
    ignorecase: number;
    /** Array of query values to filter,
      * Each query value defines the field to filter, operator, values and more
        When using OR operator should not pass 4 query values. */
    QueryValues: QueryValue[];
}