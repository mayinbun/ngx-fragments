import { InjectionToken } from '@angular/core';
import { FragmentEntryInternal, RootModuleOptions } from './model';

export const FragmentEntriesProvider = new InjectionToken<FragmentEntryInternal[]>('FragmentEntriesProvider');
export const FragmentFeatureEntriesProvider = new InjectionToken<FragmentEntryInternal[]>('FragmentFeatureEntriesProvider');

export const RootModuleOptionsProvider = new InjectionToken<RootModuleOptions>('RootModuleOptionsProvider', {
  factory: () => {
    return {
      injectToBody: false,
    };
  },
});
