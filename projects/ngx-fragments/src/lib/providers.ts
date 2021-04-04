import { InjectionToken } from '@angular/core';
import { ConfigEntry, FragmentEntry } from './model';

export const FragmentQueryParamKeysProvider = new InjectionToken<ConfigEntry[]>('FragmentQueryParamKeysProvider');
export const FragmentEntriesProvider = new InjectionToken<FragmentEntry[]>('FragmentEntriesProvider');

export const FragmentFeatureEntriesProvider = new InjectionToken<FragmentEntry[]>('FragmentFeatureEntriesProvider');

