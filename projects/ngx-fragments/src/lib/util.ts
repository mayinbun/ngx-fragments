import { FragmentEntry, Dictionary, Fragment, FragmentEntryInternal } from './model';

export function getFragmentEntryKeys(entries: FragmentEntryInternal[] = []): string[] {
  return entries.map(e => e.key);
}

export function toFragmentEntries(config: Dictionary<Fragment>): FragmentEntryInternal[] {
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

export function prefixedEntryKey(fragmentKey: string, entry: FragmentEntry): string {
  return `${fragmentKey}:${entry.key}`;
}

