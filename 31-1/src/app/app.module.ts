import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { GroupListComponent } from './group-list.component';
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup.component';
import { LoginService } from './login.service';
import { HelloComponent } from './hello.component';
import { SettingsComponent } from './settings.component';

import { ChatService } from './chat.service';

const appRoutes: Routes = [
    { path: 'settings', component: SettingsComponent },
    { path: 'hello', component: HelloComponent },
    { path: 'dialogs',component: GroupListComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent }
];

@NgModule({
    imports: [BrowserModule,
        FormsModule,
        RouterModule.forRoot(appRoutes),
        HttpModule],
    providers: [ChatService, LoginService],
    declarations: [AppComponent, GroupListComponent, LoginComponent, SignupComponent, HelloComponent, SettingsComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
