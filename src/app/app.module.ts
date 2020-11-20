import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule, OnInit } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrawerModule, DrawerOutletBase } from 'drawer';

@Component({
  template: '<h2>hello from test drawer</h2>',
  styles: [`
    h2 {
      color: white;
    }
  `],
})
class FirstDrawerComponent extends DrawerOutletBase implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.whenClosed$.subscribe(() => {
      // when can do something here when are drawer is closed
      console.log('first drawer closed');
    });
  }
}

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
class SecondDrawerComponent extends DrawerOutletBase {
  constructor() {
    super();
  }
}

@Component({
  template: `<h2 class="third-header">Third drawer title</h2>`,
  styles: [`
    .third-header {
      padding: 0 24px;
      color: darkcyan;
    }
  `],
})
export class ThirdDrawerComponent extends DrawerOutletBase {

}


@NgModule({
  declarations: [
    AppComponent,
    SecondDrawerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DrawerModule.forRoot([
      {
        key: 'first-drawer',
        type: FirstDrawerComponent,
        priority: 2,
      },
      {
        key: 'second-drawer',
        type: SecondDrawerComponent,
        priority: 1,
      },
      {
        key: 'third-drawer',
        priority: 2,
        type: ThirdDrawerComponent,
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
