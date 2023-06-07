import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() modal_id = '';
  @Input() contentText = '';
  @Output() onYesClicked = new EventEmitter();
  @Output() onNoClicked = new EventEmitter();

  constructor() {
  }

  onYesClickedMethod() {
    this.onYesClicked.emit();
  }

  onNoClickedMethod() {
    this.onNoClicked.emit();
  }
}
