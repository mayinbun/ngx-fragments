import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { NgxFragmentsModule } from '../../../projects/ngx-fragments';
import { MyCustomModalContainerComponent } from '../example-components/containers/modal-container/modal-container.component';
import { GreeterModalComponent } from '../example-components/modals/greeter-modal.component';
import { LazyFeatureComponent } from './lazy-feature.component';

const routes: Route[] = [{
  path: '',
  component: LazyFeatureComponent,
}];

@NgModule({
  imports: [
    NgxFragmentsModule.forFeature({
      lazyModal: {
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
  declarations: [LazyFeatureComponent],
  exports: [
    RouterModule,
  ],
})
export class LazyFeatureModule {

}
