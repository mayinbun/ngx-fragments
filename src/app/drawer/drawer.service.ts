import { Inject, Injectable } from '@angular/core';
import { DrawerBaseComponent } from './drawer-base';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, pairwise } from 'rxjs/operators';
import { DrawerEntriesProvider, DrawerEntry, DrawerKeysProvider } from './drawer.model';

function diff(newState: string[], oldState: string[]): string[] {
  return newState.filter((value) => {
    return oldState.indexOf(value) === -1;
  });
}

@Injectable()
export class DrawerService {
  private entriesCache = new Map<string, DrawerEntry>();
  public entriesToRender$: Observable<(DrawerEntry<DrawerBaseComponent> | undefined)[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    @Inject(DrawerEntriesProvider) public drawerEntries: DrawerEntry[],
    @Inject(DrawerKeysProvider) drawerKeys: string[],
  ) {
    const activeDrawersQueryParams = this.activatedRoute.queryParamMap.pipe(
      // map to array of key value string ['paramKey1:paramValue1'] so we can apply a diff if one of the open drawer values changes
      map((params) => params.keys.filter(key => drawerKeys.includes(key)).map((paramKey) => paramKey + ':' + params.get(paramKey))),
      pairwise(),
      map(([oldVal, newVal]) => newVal),
    );

    this.entriesToRender$ = activeDrawersQueryParams.pipe(
      map((qp) => qp.map((value) => this.getEntry(value))),
    );
  }

  private getEntry(keyValue: string): DrawerEntry | undefined {
    const key = keyValue.split(':')[0];

    const cachedDrawer = this.entriesCache.get(key);

    if (cachedDrawer) {
      return cachedDrawer;
    }

    const drawerEntry = this.drawerEntries.find((entry) => entry.key === key);

    if (drawerEntry) {
      this.entriesCache.set(key, drawerEntry);

      return drawerEntry;
    }

    return undefined;
  }

}
