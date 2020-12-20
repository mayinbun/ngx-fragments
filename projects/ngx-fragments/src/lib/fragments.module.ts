import { ModuleWithProviders, NgModule } from '@angular/core';
import { FragmentsComponent } from './fragments.component';
import { CommonModule } from '@angular/common';
import { Dictionary, Fragment } from './model';
import { FragmentEntriesProvider, FragmentQueryParamKeysProvider } from './providers';
import { FragmentOutletComponent } from './fragment-outlet/fragment-outlet.component';
import { getUrlParamKeys, toFragmentEntries } from './util';

@NgModule({
  exports: [
    FragmentsComponent,
  ],
  declarations: [
    FragmentsComponent,
    FragmentOutletComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class NgxFragmentsModule {
  public static forRoot(
    config: Dictionary<Fragment>,
  ): ModuleWithProviders<NgxFragmentsModule> {
    if (!config) {
      throw new Error('No fragments configuration provided!');
    }

    return {
      ngModule: NgxFragmentsModule,
      providers: [
        {
          provide: FragmentEntriesProvider,
          useValue: toFragmentEntries(config),
        },
        {
          provide: FragmentQueryParamKeysProvider,
          useValue: getUrlParamKeys(config),
        },
      ],
    };
  }
}


