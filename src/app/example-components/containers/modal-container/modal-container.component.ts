import { Component } from '@angular/core';
import { FragmentOutletComponent } from '../../../../../projects/ngx-fragments';

@Component({
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss'],
})
export class MyCustomModalContainerComponent {
  constructor(public outlet: FragmentOutletComponent) {
  }

  public outerClick(event: any): void {
    event.stopPropagation();
    if (event.target.className === 'modal') {
      this.outlet.close();
    }
  }
}
