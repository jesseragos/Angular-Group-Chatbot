// src/app/chat/chat.component.ts

import {
  Component,
  OnInit,
  AfterViewChecked,
  ElementRef,
  ViewChild
} from "@angular/core";
import { IChat } from "../interfaces/ichat";
import { ChatService } from "../services/chat.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})
export class ChatComponent implements OnInit, AfterViewChecked {
  chats: IChat[] = [];
  message: string;
  sending: boolean;
  botCallName = "JessBot";
  botTagName = "@" + this.botCallName;
  botDisplayName = "Jess the Chatbot";
  @ViewChild("scrollMe") private myScrollContainer: ElementRef;

  constructor(private _chatService: ChatService) {}

  ngOnInit() {
    // subscribe to pusher's event
    this._chatService.getChannel().bind("chat", data => {
      if (data.email === this._chatService.user.email) {
        data.isMe = true;
      }

      this.chats.push(data);
    });

    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      // const htmlElem = document.getElementsByName("html")[0];
      // htmlElem.scrollTop = htmlElem.scrollHeight;
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  sendMessage(message: string, isBot: boolean) {
    this.sending = true;

    if (isBot) message = `@${this.botCallName} ${message}`;

    this._chatService.sendMessage(message).subscribe(
      resp => {
        this.message = undefined;
        this.sending = false;
      },
      err => {
        this.sending = false;
      }
    );

    this.scrollToBottom();
  }

  isBot(message) {
    return message.startsWith(this.botTagName);
  }
}
