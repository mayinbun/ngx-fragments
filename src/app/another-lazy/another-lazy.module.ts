import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { NgxFragmentsModule } from '../../../projects/ngx-fragments';
import { MyCustomModalContainerComponent } from '../example-components/containers/modal-container/modal-container.component';
import { GreeterModalComponent } from '../example-components/modals/greeter-modal.component';
import { AnotherLazyComponent } from './another-lazy.component';

const routes: Route[] = [
  {
    path: '',
    component: AnotherLazyComponent,

  },
];

@NgModule({
  declarations: [
    AnotherLazyComponent,
  ],
  imports: [
    CommonModule,
    NgxFragmentsModule.forFeature({
      anotherLazyModal: {
        containerComponent: MyCustomModalContainerComponent,
        entries: [
          {
            key: 'greeter',
            type: GreeterModalComponent,
          },
        ],
      }
    }),
    RouterModule.forChild(routes),
  ],
})
export class AnotherLazyModule {
}
