import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { FragmentOutletComponent } from '../fragment-outlet/fragment-outlet.component';
import { FragmentsContainerComponent } from '../fragments-container.component';
import { FragmentsFactoryService } from '../fragments-factory.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    FragmentsContainerComponent,
    FragmentOutletComponent,
  ],
  exports: [
    FragmentsContainerComponent,
  ],
})
export class FragmentsRootModule {
  constructor(
    fragmentsFactoryService: FragmentsFactoryService,
    @Optional() @SkipSelf() parentModule?: FragmentsRootModule,
  ) {
    if (parentModule) {
      throw new Error(
        'FragmentsRootModule is already loaded. Import it in the AppModule only');
    }
    // add <fragments-container> component to document body
    fragmentsFactoryService.add(FragmentsContainerComponent);
  }
}
