import { Component, InjectionToken } from '@angular/core';
import { DrawerOutletComponent } from './drawer-outlet.component';

@Component({
  template: `
    <aside tabindex="0" role="complementary" class="right-aside">
      <a href="javascript:void(0)"
         class="close"
         (click)="outlet.close()">
        &times;
      </a>

      <ng-content></ng-content>
    </aside>
  `,
  styles: [`
    .right-aside {
      height: 100%;
      width: 500px;
      position: fixed;
      z-index: 1;
      top: 0;
      right: 0;
      background-color: #111;
      overflow-x: hidden;
      padding-top: 60px;
    }

    .close {
      position: absolute;
      top: 0;
      right: 25px;
      font-size: 36px;
      margin-left: 50px;
    }

    a {
      padding: 8px 8px 8px 32px;
      text-decoration: none;
      font-size: 25px;
      color: #818181;
      display: block;
      transition: 0.3s;
    }

    a:hover {
      color: #f1f1f1;
    }
  `],
})
export class DrawerOutletContainerComponent {
  constructor(public outlet: DrawerOutletComponent) {
  }
}

export const DrawerOutletContainerProvider = new InjectionToken('DrawerOutletContainerProvider', {
  factory: () => DrawerOutletContainerComponent,
});