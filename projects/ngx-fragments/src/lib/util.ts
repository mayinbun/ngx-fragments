import { ConfigEntry, Dictionary, Fragment, FragmentEntry } from './model';

export function toFragmentEntries(config: Dictionary<Fragment>): FragmentEntry[] {
  const mapped = Object.keys(config).map((fragmentKey) => {
    const fragment = config[fragmentKey];

    return fragment.entries.map((entry) => {
      return {
        containerComponent: fragment.containerComponent,
        ...entry,
        key: toPrefixedEntryKey(fragmentKey, entry),
      };
    });
  });

  return flatten(Object.values(mapped));
}


export function getUrlParamKeys(config: Dictionary<Fragment>): string[] {
  const keys = Object.keys(config);

  const arrays = keys.map((key) => {
    const fragment = config[key];
    const entries = fragment.entries;

    return entries.map((entry) => toPrefixedEntryKey(key, entry));
  });

  return flatten(arrays);
}


export function toPrefixedEntryKey(fragmentKey: string, entry: ConfigEntry): string {
  return `${fragmentKey}:${entry.key}`;
}

export function flatten<T>(arrays: T[][]): T[] {
  return arrays.reduce((acc, arr) => {
    return [...acc, ...arr];
  });
}
