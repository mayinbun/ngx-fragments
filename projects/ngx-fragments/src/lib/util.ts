import { ConfigEntry, Dictionary, Fragment, FragmentEntry } from './model';

export function getFragmentEntryKeys(entries: FragmentEntry[] = []): string[] {
  return entries.map(e => e.key);
}

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

  return Object.values(mapped).reduce((acc, item) => [...acc, ...item]);
}

export function toPrefixedEntryKey(fragmentKey: string, entry: ConfigEntry): string {
  return `${fragmentKey}:${entry.key}`;
}

