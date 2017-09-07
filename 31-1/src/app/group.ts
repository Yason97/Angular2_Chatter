import { User } from './user';
import { Message } from './message';

export class Group {
    public Id: number;
    public Name: string;
    public Members: Array<User>;
    public Messages: Array<Message>;
}