import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxFragmentsModule } from '../../projects/ngx-fragments';
import { MyCustomDrawerContainerComponent } from './example-components/containers/drawer-container.component';
import { FirstDrawerComponent } from './example-components/drawers/first-drawer.component';
import { SecondDrawerComponent } from './example-components/drawers/second-drawer.component';
import { MyCustomModalContainerComponent } from './example-components/containers/modal-container/modal-container.component';
import { GreeterModalComponent } from './example-components/modals/greeter-modal.component';


@NgModule({
  declarations: [
    AppComponent,

    // Example components
    GreeterModalComponent,
    FirstDrawerComponent,
    SecondDrawerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxFragmentsModule.forRoot(
      {
        modal: {
          containerComponent: MyCustomModalContainerComponent,
          entries: [
            {
              key: 'greeter',
              type: GreeterModalComponent,
            },
          ],
        },
        drawer: {
          containerComponent: MyCustomDrawerContainerComponent,
          entries: [
            {
              key: 'first',
              type: FirstDrawerComponent,
            },
            {
              key: 'second',
              type: SecondDrawerComponent,
            },
          ],
        },
      }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
