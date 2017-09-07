import { User } from './user.ts';
import { Group } from './group.ts';

export class Message {
    public TimeStapm: string;
    public Text: string;
    public Owner: User;
    public Discussion: Group;
}