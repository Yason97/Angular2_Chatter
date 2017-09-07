import { Component} from '@angular/core';

import { User } from './user';
import { LoginService } from './login.service';

@Component({
    selector: 'hello',
    templateUrl: './hello.component.html',
    //providers: [LoginService]
})

export class HelloComponent {

    constructor(private loginService: LoginService) { }

}