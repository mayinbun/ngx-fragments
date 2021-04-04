import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FragmentOutletComponent } from './fragment-outlet/fragment-outlet.component';
import { FragmentsComponent } from './fragments.component';
import { Dictionary, Fragment } from './model';
import { FragmentsFeatureModule } from './modules/fragments-feature.module';
import { FragmentEntriesProvider, FragmentFeatureEntriesProvider, FragmentQueryParamKeysProvider } from './providers';
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

  public static forFeature(config: Dictionary<Fragment>): ModuleWithProviders<FragmentsFeatureModule> {
    return {
      ngModule: FragmentsFeatureModule,
      providers: [
        {
          provide: FragmentFeatureEntriesProvider,
          useValue: toFragmentEntries(config),
        },
      ],
    };
  }
}
