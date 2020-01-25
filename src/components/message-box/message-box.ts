import { Component, Input } from '@angular/core';
import { Message } from '../../models/message.model';

@Component({
  selector: 'message-box',
  templateUrl: 'message-box.html',
  host: {
    '[style.justify-content]': '((!isSender) ? "flex-start" : "flex-end")',
    '[style.text-align]': '((!isSender) ? "left" : "right")'
  }
})
export class MessageBoxComponent {
  @Input() message:Message;
  @Input() isSender:boolean;

  constructor() {}
}
