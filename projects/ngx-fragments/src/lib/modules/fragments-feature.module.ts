import { Inject, NgModule } from '@angular/core';
import { FragmentsStateService } from '../fragments-state.service';
import { FragmentEntry } from '../model';
import { FragmentFeatureEntriesProvider } from '../providers';

@NgModule()
export class FragmentsFeatureModule {
  constructor(
    @Inject(FragmentFeatureEntriesProvider) featureEntries: FragmentEntry[],
    stateService: FragmentsStateService,
  ) {
    stateService.setState(featureEntries);
  }
}
