import { Subject } from 'rxjs/Subject';
export interface EmptyFunc {
    (): void;
}
export interface ProgressOptions
{
     /**
      * The text to display in the progressBar popup.
      * 
      * @type {string}
      * @memberOf MessageOptions
      */
     progressText: string,
     /**
      * A number indicating the progress percentage.
      * 
      * @type {number}
      * @memberOf MessageOptions
      */
     progVal?: Subject<number>,
     /**
      * A function to call when a user clicks the cancel button.
      * Sometimes when the progress is too long the user may click the cancel button.
      * 
      * @type {Function}
      * @memberOf MessageOptions
      */
     cancel:EmptyFunc
}