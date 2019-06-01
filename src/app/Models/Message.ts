import {MessageHistory} from './MessageHistory';

export class Message {

  constructor(
    public messageCreator?: number,
    public id?: number,
    public messageHistory?: MessageHistory,
    public fromUser?: string,
    public receiverEmail?: string,
    public senderEmail?: string
  ) {
  }
}
