import { InjectionToken, Type } from '@angular/core';
import { Entry } from './drawer.model';

export const UrlParamKeysProvider = new InjectionToken<Entry[]>('UrlParamKeysProvider');
export const DrawerKeysProvider = new InjectionToken<string[]>('DrawerKeysProvider');

export const EntriesProvider = new InjectionToken<string[]>('EntriesProvider');

export const OutletContainerProvider = new InjectionToken<Type<any>>('OutletContainerProvider');
