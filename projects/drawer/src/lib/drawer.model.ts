import { Type } from '@angular/core';
import { DrawerOutletBase } from './drawer-outlet/drawer-outlet-base';

export interface DrawerEntry<T extends DrawerOutletBase = DrawerOutletBase> {
  key: string;
  type: Type<T>;
  priority?: number;
}
