import { ModuleWithProviders, NgModule } from '@angular/core';
import { FragmentsComponent } from './fragments.component';
import { CommonModule } from '@angular/common';
import { Fragment, ConfigEntry, FragmentEntry } from './model';
import { FragmentEntriesProvider, FragmentQueryParamKeysProvider } from './providers';
import { Dictionary, flatten, mapObjIndexed, values } from 'ramda';
import { FragmentOutletComponent } from './fragment-outlet/fragment-outlet.component';

@NgModule({
  exports: [
    FragmentsComponent,
  ],
  declarations: [
    FragmentsComponent,
    FragmentOutletComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class NgxFragmentsModule {
  public static forRoot(
    config: Dictionary<Fragment>,
  ): ModuleWithProviders<NgxFragmentsModule> {
    if (!config) {
      throw new Error('No fragments configuration provided!');
    }

    return {
      ngModule: NgxFragmentsModule,
      providers: [
        {
          provide: FragmentEntriesProvider,
          useValue: toFragmentEntries(config),
        },
        {
          provide: FragmentQueryParamKeysProvider,
          useValue: getUrlParamKeys(config),
        },
      ],
    };
  }
}

export function getUrlParamKeys(cfg: Dictionary<Fragment>): string[] {
  const prefixedParamKeys = mapObjIndexed((item, key) =>
    item.entries.map(entry => toPrefixedEntryKey(key, entry)), cfg);

  return flatten(values(prefixedParamKeys));
}

export function toFragmentEntries(cfg: Dictionary<Fragment>): FragmentEntry[] {
  const mapped = mapObjIndexed((cfgItem, cfgKey) => {
    return cfgItem.entries.map((entry) => {
      return {
        containerComponent: cfgItem.containerComponent,
        ...entry,
        key: toPrefixedEntryKey(cfgKey, entry),
      };
    });
  }, cfg);


  return flatten(values(mapped));
}

export function toPrefixedEntryKey(prefix: string, entry: ConfigEntry): string {
  return `${prefix}:${entry.key}`;
}
