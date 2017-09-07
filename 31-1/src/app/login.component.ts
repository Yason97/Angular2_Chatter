import { Component } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import { Login } from './login';
import { User } from './user';
import { LoginService } from './login.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    //providers: [LoginService]
})

export class LoginComponent {
    user: User;
    login: Login;

    constructor(private loginService: LoginService, private router: Router) {
        console.log("Login. constructor");
        this.login = new Login();
    }

    private submit() {
        console.log("Login. submit");
        this.user = new User();
        this.user.NickName = this.login.nickname;
        this.user.Password = this.login.password;
        this.loginService.login(this.user)
            .then((user) => { this.loginService.success(); this.router.navigate(['/dialogs']);})
            .catch((error) => this.showWarning(error))
    }

    private showWarning(data: any): void {
        console.log("warning in Sign-Up");
        console.error(data);
    }
}