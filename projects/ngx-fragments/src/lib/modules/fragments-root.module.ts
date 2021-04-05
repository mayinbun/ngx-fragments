import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FragmentOutletComponent } from '../fragment-outlet/fragment-outlet.component';
import { FragmentsComponent } from '../fragments.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    FragmentsComponent,
    FragmentOutletComponent,
  ],
  exports: [
    FragmentsComponent,
  ],
})
export class FragmentsRootModule {}
