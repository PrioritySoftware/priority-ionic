import { Injectable } from '@angular/core';
import * as Priority from 'priority-web-sdk';


@Injectable()
export class PriorityService
{
    priority;
    constructor( ){
        this.priority=Priority;
    }
}