import { Inject, NgModule } from '@angular/core';
import { FragmentsStateService } from '../fragments-state.service';
import { FragmentEntryInternal } from '../model';
import { FragmentFeatureEntriesProvider } from '../providers';
import { getFragmentEntryKeys } from '../util';

@NgModule()
export class FragmentsFeatureModule {
  constructor(
    @Inject(FragmentFeatureEntriesProvider) featureFragments: FragmentEntryInternal[],
    private fragmentStateService: FragmentsStateService,
  ) {
    this.fragmentStateService.extendRootFragments(featureFragments);
    this.fragmentStateService.extendRootFragmentQueryParamKeys(
      getFragmentEntryKeys(featureFragments),
    );
  }
}
