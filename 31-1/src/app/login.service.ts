import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { User, UserWrapper } from './user';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService{
    private URL: string = "http://localhost:63056/api/user";
    public user: User;
    public userState$: Observable<User>;
    private userStateSubject: Subject<User>;

    constructor(private http: Http) {
        console.log("login.service. constructor");
        this.userStateSubject = new Subject<User>();
        this.userState$ = this.userStateSubject.asObservable();
        //this.user = this.retrieveUserFromLocalStorage();
    }

    public login(user: User): Promise<User> {
        console.log("loginService. login");
        let wrapper = new UserWrapper();
        wrapper.user = user;
        wrapper.purpose = 'login';
        return this.http.post('/api/user', wrapper)
            .toPromise()
            .then(response => {
                this.user = response.json() as User;
                console.log("Loged in");
                console.log("Retrieved user from server: ");
                console.log(this.user);
                this.saveUserToLocalStorage(this.user);
                return Promise.resolve(response.json() as User);
            })
            .catch(error => { this.handleError(error); return Promise.reject(null); }); 
    }

    public logout() {
        localStorage.removeItem('user');
        this.user = null;
    }

    public signin() {

    }

    private handleError(error: any): Promise<any> {
        console.log("Error ocured. " + error);
        return Promise.reject(error);
    }

    private changeUser(user: User) {
        console.log("User chenged");
        console.log("User before: ");
        console.log(this.user);
        this.user = user;
        console.log("User after: ");
        console.log(this.user);
        this.userStateSubject.next(this.user);
        console.log("Pushed user-changed notification");
    }

    public saveUserToLocalStorage(user: User) {       
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(user));
        console.log("User saved local");
        console.log(user);
        console.log(JSON.stringify(user));
        this.changeUser(user);
    }

    public retrieveUserFromLocalStorage(): any {
        this.user = JSON.parse(localStorage.getItem('user'));
        console.log("retrieved user:");
        console.log(this.user) ;    
        this.changeUser(this.user);
        console.log("returning from retrieveUserFromLocalStorage()");
        console.log(this.user ? this.user.NickName ? this.user : null : null);
        return this.user ? this.user.NickName ? this.user: null : null;
    }

    public checkUserName(name: string): Promise<boolean> {
        let user = new User();
        user.NickName = name;
        let wrapper = new UserWrapper();
        wrapper.purpose = 'check';
        wrapper.user = user;
        return this.http.post(this.URL, wrapper).toPromise()
            .then((nickname) => { console.log("Name exists: " + nickname); return true; })
            .catch((error) =>
            {
                console.error(error);
                return false;
            });
    }

    public checkUser(user: User): Promise<boolean> {
        return this.checkUserName(user.NickName)
            .then((name_exists) => {
                console.log("name_exists: " + name_exists);
                if (name_exists) {
                    console.log("Name exists");
                    return false;
                }
                else {
                    console.log("Name does not exist");
                    return true;
                }
            })
            .catch(() => { console.log("Name exists"); return Promise.reject(false) });;
    }

    public saveUserToServer(user: User): Promise<boolean> {
        let wrapper = new UserWrapper();
        wrapper.purpose = "signin";
        wrapper.user = user;
        return this.http.post(this.URL, wrapper).toPromise()
            .then((data) => {
                console.log("User saved to server");
                this.saveUserToLocalStorage(user);
                return Promise.resolve(true);
            })
            .catch((error) => {
                console.log("User was not saved");
                console.log("error:");
                console.error(error);
                return Promise.reject(false);
            });
    }

    public updateUserOnServer(user: User): Promise<boolean> {
        console.log("PUT URL");
        console.log(this.URL + "/" + user.Id);
        return this.http.put(this.URL + "/" + user.Id, user).toPromise()
            .then(() => {
                console.log("User updated to server");
                this.saveUserToLocalStorage(user);
                return true;
            })
            .catch((error) => {
                console.error(error);
                return false;
            })
    }

    public success(): void {
        console.log("Success");
        //this.saveUserToLocalStorage(this.user);
    }
}