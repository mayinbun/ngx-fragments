import { FragmentOutletBase } from '../../../../projects/ngx-multi-drawer';
import { Component } from '@angular/core';

@Component({
  styles: [`
    div {
      background: yellow;
    }
  `],
  template: `

    <div>
      <h3>Content from second drawer</h3>
      <span>
        async value: {{whenQueryParamValueChanged$ | async}}
      </span>
    </div>
  `,
})
export class SecondDrawerComponent extends FragmentOutletBase {
  constructor() {
    super();
  }
}
