import { Component } from '@angular/core';
import { FragmentOutletBase } from '../../../../projects/ngx-fragments';

@Component({
  styles: [
    `.greeting {
      font-size: 1.5rem;
      color: cornflowerblue;
      text-shadow: #333333;
    }
    `,
  ],
  template: `
    <div class="greeting">
      Greeting: {{ whenQueryParamValueChanged$ | async }}
    </div>
  `,
})
export class GreeterModalComponent extends FragmentOutletBase {
  constructor() {
    super();
  }
}
