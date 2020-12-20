import { FragmentOutletBase } from '../../../../projects/ngx-fragments';
import { Component, OnInit } from '@angular/core';

@Component({
  template: '<h2>hello from test drawer</h2>',
  styles: [`
    h2 {
      color: white;
    }
  `],
})
export class FirstDrawerComponent extends FragmentOutletBase implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.whenClosed$.subscribe(() => {
      // when listen to fragment close events and do something
      console.log('first drawer is closed');
    });
  }
}
