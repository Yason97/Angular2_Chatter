import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { Observable } from 'rxjs/Observable';
import { Message } from './message';
import { Login } from './login';
import { LoginService } from './login.service';
import { User } from './user';
import { GroupListComponent } from './group-list.component';
import { Router } from '@angular/router';

declare var $: any;

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [GroupListComponent]
})

export class AppComponent implements OnInit {
    private user: User;
    private chat: any = '';
    private state$: Observable<string>;

    constructor(
        private chatService: ChatService,
        private loginService: LoginService,
        private router: Router,
        private groupListComponent: GroupListComponent
    ) {
        this.loginService.userState$.subscribe((user) => { this.user = user });
    }

    ngOnInit() {
        console.log("App.component. constuctor");
        this.setStartPage();
        this.chatService.connect();
        this.chatService.start();
        if (this.chatService === undefined)
            throw new Error('chatService is undefined');
        if (this.chatService.message$ === undefined)
            throw new Error('chatService.message$ is undefined');
        this.state$ = this.chatService.state$;
        this.chatService.message$.subscribe((message: Message) => { this.groupListComponent.displayMessage(message); });
        //this.state$.subscribe((status: string) => { if (status == 'connected') this.name = 'Angular WebSite'; });
    }

    private setStartPage() {
        console.log("App.component. setStartPage. Asking for user...");
        this.user = this.loginService.retrieveUserFromLocalStorage() as User;
        console.log("App.component. user: ");
        console.log(this.user);

        if (this.user == null)
            this.router.navigate(['/hello']);
        else
            this.router.navigate(['/dialogs']);
        console.log("User in app-root");
        console.log(this.user);
    }

    private logout(data: any): void {
        console.log("data");
        console.log(data);
        this.loginService.logout();
    }

    private selectTab() { }
}
