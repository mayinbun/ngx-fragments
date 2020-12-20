import { Type } from '@angular/core';
import { FragmentOutletBase } from './fragment-outlet/fragment-outlet-base';

export interface Dictionary<T> {
  [index: string]: T;
}

export interface Fragment {
  containerComponent: Type<any>;
  entries: ConfigEntry[];
}

export interface ConfigEntry<T extends FragmentOutletBase = FragmentOutletBase> {
  key: string;
  type: Type<T>;
  priority?: number;
}

export interface FragmentEntry extends ConfigEntry {
  containerComponent: Type<any>;
}
