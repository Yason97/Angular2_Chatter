import { Component, OnInit } from '@angular/core';
import { Login } from './login';
import { LoginService } from './login.service';
import { User } from './user';
import { Router } from '@angular/router';

declare var $: any;

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
})

export class SettingsComponent implements OnInit {
    private user: User;
    private oldPassword: string;
    private userCopy: User;
    private login: Login;

    constructor(private loginService: LoginService, private router: Router) {
        console.log('SettingsComponent. constructor');
        this.user = new User();
        this.loginService.userState$.subscribe(user => this.user = user);
    }

    ngOnInit() {
        console.log('SettingsComponent. OnInit');
        this.user = this.loginService.user;
        this.userCopy = Object.create(this.user);
        this.userCopy.Password = null;
    }

    private submit() {
        console.log('SettingsComponent. submit');
        console.log(this.user);
        console.log(this.userCopy);
        if (this.checkUser()) {
            console.log("this.user");
            console.log(this.user);
            this.loginService.updateUserOnServer(this.user)
                .then((success) => {
                    if (success) {
                        this.loginService.success();
                        this.router.navigate(['/dialogs'])
                    }
                    else this.showWarning("Failed to save changes");
                })
                .catch((error) => this.showWarning(error))
        }
        else this.showWarning("Wrong password");
        //this.loginService.saveUserToLocalStorage(this.user);
    }

    private cancel() {
        console.log('SettingsComponent. cancel');
        this.user = null;
        this.router.navigate(['/dialogs']);
    }

    private showWarning(data: any): void {
        console.log("warning in Settings");
        console.error(data);
    }

    private checkUser(): boolean {
        if (this.userCopy.Password != '' && this.userCopy.Password != null) {
            this.oldPassword = this.oldPassword ? this.oldPassword : '';
            this.user.Password = this.user.Password ? this.user.Password : '';
            console.log("password old: " + this.user.Password);
            console.log("password old entered: " + this.oldPassword);
            if (this.oldPassword != this.user.Password) {
                return false;
            }
            else {
                this.user.Password = this.userCopy.Password;
            };
        }
        this.user.LastName = this.userCopy.LastName != this.user.LastName ? this.userCopy.LastName : this.user.LastName;
        this.user.FirstName = this.userCopy.FirstName != this.user.FirstName ? this.userCopy.FirstName : this.user.FirstName;
        return true;
    }
}
