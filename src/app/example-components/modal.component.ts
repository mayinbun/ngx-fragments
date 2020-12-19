import { Component } from '@angular/core';
import { DrawerOutletComponent } from '../../../projects/ngx-multi-drawer';

@Component({
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  constructor(public outlet: DrawerOutletComponent) {
  }
}
