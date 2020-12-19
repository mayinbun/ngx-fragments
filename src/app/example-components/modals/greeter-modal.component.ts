import { Component } from '@angular/core';
import { FragmentOutletBase } from '../../../../projects/ngx-multi-drawer';

@Component({
  templateUrl: './greeter-modal.component.html',
  styleUrls: ['./greeter-modal.component.scss'],
})
export class GreeterModalComponent extends FragmentOutletBase {
  constructor() {
    super();
  }
}
