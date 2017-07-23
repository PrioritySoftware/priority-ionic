import { Injectable } from '@angular/core';
// import { ConfigurationService, Message } from 'priority-ionic';
import { ConfigurationService } from './configuration.service';
import {  Message } from '../entities/message.class';

const CharSeparator : string = ".";

declare var setMessages, getMessage;
@Injectable()
export class MessagesService
{
    constructor(
        private configService : ConfigurationService
    ){}

    private messagesList : string[][] = [];
    
    setMessages(ename: string, type: string, from: number, to: number)
    {
        this.configService.getEntMessages(ename, type, from, to).then(
            (entMessages: Message[])=>
            {
                let key : string = ename + CharSeparator + type;
                if(!this.messagesList[key])
                {
                    this.messagesList[key]=[];              
                }
                let messages : string[] = this.messagesList[key];
                entMessages.forEach(msg => {
                        messages[msg.num]=msg.message;
                });            
            },
            (reason)=>{}
        );   

    }

    getMessage(ename: string, type: string, num : number) : string
    {
        let key : string = ename + CharSeparator + type;
        if(this.messagesList[key] && this.messagesList[key][num])
            return this.messagesList[key][num];
        return "";
    }
}