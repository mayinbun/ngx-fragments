import { Type } from '@angular/core';
import { FragmentOutletBase } from './fragment-outlet/fragment-outlet-base';

export interface Dictionary<T> {
  [index: string]: T;
}

export interface Fragment {
  containerComponent: Type<any>;
  entries: FragmentEntry[];
}

export interface FragmentEntry<T extends FragmentOutletBase = FragmentOutletBase> {
  key: string;
  type: Type<T>;
  priority?: number;
}

export interface FragmentEntryInternal extends FragmentEntry {
  containerComponent: Type<any>;
}
