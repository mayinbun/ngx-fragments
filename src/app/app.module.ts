import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule, OnInit } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrawerModule } from './drawer/drawer.module';
import { DrawerBaseComponent } from './drawer/drawer-base';

@Component({
  template: '<h2>hello from test drawer</h2>',
  styles: [`
    h2 {
      color: white;
    }
  `],
})
class FirstDrawer extends DrawerBaseComponent implements OnInit {
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
class SecondDrawer extends DrawerBaseComponent {
  constructor() {
    super();
  }
}


@NgModule({
  declarations: [
    AppComponent,
    SecondDrawer,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DrawerModule.forRoot([
      {
        key: 'first-drawer',
        type: FirstDrawer,
      },
      {
        key: 'second-drawer',
        type: SecondDrawer,
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
