import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { LoginService } from './login.service';
import { User } from './user';
import { Group } from './group';
import { Message } from './message';

declare var $: any;

@Component({
    selector: 'group-list',
    templateUrl: './group-list.component.html',
    styleUrls: ['./group-list.component.css']
})

export class GroupListComponent implements OnInit {
    groups: Array<string> = ['Public', 'Secret chat', 'Raiders!!'];
    selectedGroup: Group = new Group();

    private user: User;

    constructor(
        private chatService: ChatService,
        private loginService: LoginService
    ) { }

    ngOnInit() {
        console.log("discussion.component. OnInit");
        this.user = this.loginService.user;
    }

    private selectGroup(groupName: string) {
        console.log("groupName: " + groupName);
        this.selectedGroup.Name = groupName;
        console.log("this.selectedGroup.Name: " + this.selectedGroup.Name);
    }

    public displayMessage(message: Message) {
        console.log("Message got");
        console.log($('#' + message.DiscussionName));
        $('#' + message.DiscussionName).append('<li><strong>' + message.OwnerId
            + '</strong>:&nbsp;&nbsp;' + message.Text + '</li>');
    }

    public sendMessage(text: string): void {
        var message = new Message();
        message.OwnerId = this.user.Id;
        message.Text = text;
        message.DiscussionName = this.selectedGroup.Name;
        this.chatService.messageSender(message);
        console.log("Message sent");
    }
}