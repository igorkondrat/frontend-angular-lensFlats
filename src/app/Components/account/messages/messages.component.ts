import {Component, OnInit} from '@angular/core';
import {MessageService} from '../../../Services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages;

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
    this.messageService.getAllMessage().subscribe((response) => {
      this.messages = response;
    });
  }

}
