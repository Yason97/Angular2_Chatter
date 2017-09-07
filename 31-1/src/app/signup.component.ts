import { Component } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import { Login } from './login';
import { User } from './user';
import { LoginService } from './login.service';

@Component({
    selector: 'signup',
    templateUrl: './signup.component.html',
})

export class SignupComponent {
    user: User;
    repeatedPassword: string;

    constructor(private loginService: LoginService, private router: Router) {
        this.user = new User();
        console.log("SignupComponent. constructor");
    }

    submit() {
        console.log("SignupComponent. submit");
        let validData = this.checkPassword();
        if (validData) {
            this.loginService.checkUser(this.user)
                .then((validUser) => {
                    if (validUser)
                        this.loginService.saveUserToServer(this.user)
                            .then(() => {
                                this.loginService.success();
                                this.router.navigate(['/dialogs']);
                            })
                            .catch((error) => this.showWarning(error))
                    else
                        this.showWarning("nickname exists");
                })                
                .catch((error) => this.showWarning(error));
        }
        else this.showWarning("Passwords are not identical");     
    }

    private showWarning(data: any): void
    {
        console.log("warning in Sign-Up");
        console.error(data);
    }

    private success(): void {
        console.log("Success");
        this.loginService.saveUserToLocalStorage(this.user);
        this.router.navigate(['/dialogs']);
    }

    private checkPassword(): boolean {
        if (this.user.Password == '' || this.repeatedPassword == '') return false;
        return this.user.Password == this.repeatedPassword;
    }
}