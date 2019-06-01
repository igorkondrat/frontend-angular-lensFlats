import {Component, OnInit} from '@angular/core';
import {MessageService} from '../../../../Services/message.service';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-single-message',
  templateUrl: './single-message.component.html',
  styleUrls: ['./single-message.component.css']
})
export class SingleMessageComponent implements OnInit {

  constructor(private messageService: MessageService,
              private activatedRoute: ActivatedRoute) {
  }

  messages;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.messageService.getSingleMessage(params.messageId).subscribe((response) => {
        this.messages = response;
      });
    });
  }

  sendMessage(messageForm: NgForm) {
    // @ts-ignore
    document.getElementById('text').value = '';
    this.messageService.sendMessage(messageForm.value).subscribe(() => {
      this.messageService.getSingleMessage(this.messages.id).subscribe((res) => {
        this.messages = res;
      });
    });
  }
}
