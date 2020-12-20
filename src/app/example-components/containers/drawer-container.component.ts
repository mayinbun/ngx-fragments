import { FragmentOutletComponent } from '../../../../projects/ngx-fragments';
import { Component } from '@angular/core';

@Component({
  template: `
    <div class="left-aside">
      <ng-content></ng-content>

      <button (click)="outlet.close()">close</button>
    </div>
  `,
  styles: [
    `
      button {
        width: 100%;
        background: cornflowerblue;
      }

      .left-aside {
        height: 100%;
        width: 500px;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        background-color: midnightblue;
        color: black;
        overflow-x: hidden;
        padding-top: 60px;
      }
    `,
  ],
})
export class MyCustomDrawerContainerComponent {
  constructor(public outlet: FragmentOutletComponent) {
  }
}
