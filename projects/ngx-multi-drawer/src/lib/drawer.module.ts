import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { DrawerComponent } from './drawer.component';
import { CommonModule } from '@angular/common';
import { DrawerOutletComponent } from './drawer-outlet/drawer-outlet.component';
import { CfgItem, TransformedEntry } from './drawer.model';
import { EntriesProvider, UrlParamKeysProvider } from './providers';
import {
  DrawerOutletContainerComponent,
  DrawerOutletContainerProvider,
} from './drawer-outlet/drawer-outlet-container.component';
import { Dictionary, flatten, mapObjIndexed, values } from 'ramda';

@NgModule({
  exports: [
    DrawerComponent,
  ],
  declarations: [
    DrawerComponent,
    DrawerOutletComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class NgxDrawerModule {
  public static forRoot(
    cfg: Dictionary<CfgItem>,
    customContainer: Type<any> = DrawerOutletContainerComponent,
  ): ModuleWithProviders<NgxDrawerModule> {
    return {
      ngModule: NgxDrawerModule,
      providers: [
        {
          provide: EntriesProvider,
          useValue: transformCfg(cfg),
        },
        {
          provide: UrlParamKeysProvider,
          useValue: getUrlParamKeys(cfg),
        },
        {
          provide: DrawerOutletContainerProvider,
          useValue: customContainer,
        },
      ],
    };
  }
}

export function getUrlParamKeys(cfg: Dictionary<CfgItem>): string[] {
  const prefixedParamKeys = mapObjIndexed((item, key) => {
    return item.entries.map((entry) => `${key}:${entry.key}`);
  }, cfg);

  return flatten(values(prefixedParamKeys));
}

export function transformCfg(cfg: Dictionary<CfgItem>): TransformedEntry[] {
  const mapped = mapObjIndexed((cfgItem, cfgKey) => {
    return cfgItem.entries.map((entry) => {
      return {
        containerComponent: cfgItem.containerComponent,
        ...entry,
        key: `${cfgKey}:${entry.key}`,
      };
    });
  }, cfg);


  return flatten(values(mapped));
}
