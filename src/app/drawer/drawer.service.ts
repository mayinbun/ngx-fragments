import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { DrawerEntriesProvider, DrawerEntry, DrawerKeysProvider } from './drawer.model';

@Injectable()
export class DrawerService {
  private entriesCache = new Map<string, DrawerEntry>();
  public entriesToRender$: Observable<DrawerEntry[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    @Inject(DrawerEntriesProvider) public drawerEntries: DrawerEntry[],
    @Inject(DrawerKeysProvider) drawerKeys: string[],
  ) {
    this.entriesToRender$ = this.activatedRoute.queryParamMap.pipe(
      map((paramMap) =>
        paramMap.keys
          .filter(key => drawerKeys.includes(key))
          .map((drawerKey) => this.getEntry(drawerKey)),
      ),
      map((entries) => entries.sort(({ priority: aPrio = 0 }, { priority: bPrio = 0 }) => aPrio - bPrio)),
    );
  }

  private getEntry(key: string): DrawerEntry {
    const cachedDrawer = this.entriesCache.get(key);

    if (cachedDrawer) {
      return cachedDrawer;
    }

    const drawerEntry: DrawerEntry = this.drawerEntries.find((entry) => entry.key === key) as DrawerEntry;

    this.entriesCache.set(key, drawerEntry);
    return drawerEntry;
  }
}
