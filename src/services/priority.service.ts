import { Inject, Injectable } from '@angular/core';

@Injectable()
export class PriorityService
{
    constructor( @Inject('priority-web-sdk') public priority: any){}
}