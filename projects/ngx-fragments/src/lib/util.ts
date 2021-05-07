import { ConfigEntry, Dictionary, Fragment, FragmentEntry } from './model';

export function getFragmentEntryKeys(entries: FragmentEntry[] = []): string[] {
  return entries.map(e => e.key);
}

export function toFragmentEntries(config: Dictionary<Fragment>): FragmentEntry[] {
  const keys = Object.keys(config);

  if (!keys.length) {
    return [];
  }

  const mapped = keys.map((fragmentKey) => {
    const fragment = config[fragmentKey];

    return fragment.entries.map((entry) => {
      return {
        containerComponent: fragment.containerComponent,
        ...entry,
        key: prefixedEntryKey(fragmentKey, entry),
      };
    });
  });

  return Object.values(mapped).reduce((acc, item) => [...acc, ...item]);
}

export function prefixedEntryKey(fragmentKey: string, entry: ConfigEntry): string {
  return `${fragmentKey}:${entry.key}`;
}

