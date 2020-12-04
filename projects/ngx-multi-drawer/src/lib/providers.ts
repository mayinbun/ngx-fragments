import { InjectionToken } from '@angular/core';
import { DrawerEntry } from './drawer.model';

export const DrawerEntriesProvider = new InjectionToken<DrawerEntry[]>('DrawerEntriesProvider');
export const DrawerKeysProvider = new InjectionToken<string[]>('DrawerKeysProvider');
