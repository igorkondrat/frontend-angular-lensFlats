import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessageService} from '../../../../Services/message.service';
import {NgForm} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.css']
})
export class CreateMessageComponent implements OnInit, OnDestroy {
  email = '';
  answer;

  constructor(private messageService: MessageService, private route: ActivatedRoute) {
  }

  ngOnDestroy(): void {
  }

  ngOnInit() {
    this.route.params.subscribe((res) => {
      this.email = res.email;
    });
  }

  createMessage(messageForm: NgForm) {
    this.messageService.createMessage(messageForm.value).subscribe((response) => {
      this.answer = response;
    });
  }

}
