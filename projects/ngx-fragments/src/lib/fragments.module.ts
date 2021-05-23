import { ModuleWithProviders, NgModule } from '@angular/core';
import { Dictionary, Fragment } from './model';
import { FragmentsFeatureModule } from './modules/fragments-feature.module';
import { FragmentsRootModule } from './modules/fragments-root.module';
import { FragmentEntriesProvider, FragmentFeatureEntriesProvider } from './providers';
import { toFragmentEntries } from './util';

@NgModule()
export class NgxFragmentsModule {
  public static forRoot(
    config: Dictionary<Fragment> = {},
  ): ModuleWithProviders<FragmentsRootModule> {
    return {
      ngModule: FragmentsRootModule,
      providers: [
        {
          provide: FragmentEntriesProvider,
          useValue: toFragmentEntries(config),
        },
      ],
    };
  }

  public static forFeature(config: Dictionary<Fragment>): ModuleWithProviders<FragmentsFeatureModule> {
    if (!config) {
      throw new Error('[NgxFragmentsModule.forFeature] No fragments configuration provided!');
    }

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
