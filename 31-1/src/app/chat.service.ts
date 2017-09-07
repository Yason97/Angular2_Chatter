import { Injectable } from '@angular/core';
import { Message } from './message';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

declare var $: any;
@Injectable()
export class ChatService {
    public chat: any = '';
    public message$: Observable<Message>;
    public state$: Observable<string>;
    public messageSender: any;
    private messageSubject = new Subject<Message>();
    private stateSubject = new Subject<string>();

    public connect(): void {
        console.log("chatService. connecting...");
        if ($.connection === undefined) throw new Error("$.connection not exists");
        if ($.connection.chatHub === undefined) throw new Error("$.connection.chatHub not exists");
        this.chat = $.connection.chatHub;
        console.log("connected to hub.");
        console.log(this.chat);
        var _that = this;
        this.chat.client.broadcastMessage = function (message: Message) {
            message.OwnerId = $('<div />').text(message.OwnerId).html();
            message.Text = $('<div />').text(message.Text).html();
            console.log("message received from server");
            console.log(message);
            _that.messageSubject.next(message);
        }

        console.log("broadcastMessage set.");
        this.message$ = this.messageSubject.asObservable();
        this.state$ = this.stateSubject.asObservable();
        console.log('message$');
        console.log(this.message$);
        this.messageSender = this.createSender(this);
    }

    public start() {
        console.log("chatService. starting...");
        var _that = this;
        $.connection.hub.start().done(function () {
            console.log("chatService. started!");
            console.log(_that.chat);
            _that.stateSubject.next('connected!');
        });
    }

    private createSender(_this: any): any {
        var _that = _this;
        return function (message: Message) {
            _that.chat.server.send(message);
            console.log("Chat.service message sent to server");
        }
    }
}