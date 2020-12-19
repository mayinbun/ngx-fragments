import { Type } from '@angular/core';
import { OutletBase } from './drawer-outlet/outlet-base';

export interface Entry<T extends OutletBase = OutletBase> {
  key: string;
  type: Type<T>;
  priority?: number;
}

export interface CfgItem {
  containerComponent: Type<any>;
  entries: Entry[];
}

export interface TransformedEntry extends Entry {
  containerComponent: Type<any>;
}
