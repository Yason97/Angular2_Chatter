import { Group } from './group'

export class User{
    public Id: number;
    public NickName: string;
    public FirstName: string;
    public LastName: string;
    public Password: string;

    public Groups: Array<Group>;
}

export class UserWrapper {
    public user: User;
    public purpose: string;
}