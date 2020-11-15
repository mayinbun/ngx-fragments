import { DrawerBaseComponent } from './drawer-base';
import { InjectionToken, Type } from '@angular/core';

export const DrawerEntriesProvider = new InjectionToken<DrawerEntry[]>('DrawerEntriesProvider');
export const DrawerKeysProvider = new InjectionToken<string[]>('DrawerKeysProvider');

export interface DrawerEntry<T extends DrawerBaseComponent = DrawerBaseComponent> {
  key: string;
  type: Type<T>;
}
