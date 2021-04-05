import { InjectionToken } from '@angular/core';
import { FragmentEntry } from './model';

export const FragmentEntriesProvider = new InjectionToken<FragmentEntry[]>('FragmentEntriesProvider');
export const FragmentFeatureEntriesProvider = new InjectionToken<FragmentEntry[]>('FragmentFeatureEntriesProvider');

