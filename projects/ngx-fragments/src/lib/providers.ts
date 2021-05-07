import { InjectionToken } from '@angular/core';
import { FragmentEntryInternal } from './model';

export const FragmentEntriesProvider = new InjectionToken<FragmentEntryInternal[]>('FragmentEntriesProvider');
export const FragmentFeatureEntriesProvider = new InjectionToken<FragmentEntryInternal[]>('FragmentFeatureEntriesProvider');

