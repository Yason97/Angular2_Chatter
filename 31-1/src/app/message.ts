import { User } from './user';
import { Group } from './group';

export class Message {
    public Id: number;
    public TimeStapm: string;
    public Text: string;
    public OwnerId: number;
    public DiscussionName: string;
}