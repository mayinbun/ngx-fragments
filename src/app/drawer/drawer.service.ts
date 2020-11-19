import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { DrawerEntry } from './drawer.model';
import { DrawerEntriesProvider, DrawerKeysProvider } from './providers';

@Injectable()
export class DrawerService {
  public entriesToRender$: Observable<DrawerEntry[]>;

  private entriesCache = new Map<string, DrawerEntry>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
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

  public closeDrawer(entry: DrawerEntry): void {
    if (!entry) {
      return;
    }

    this.router.navigate([], {
      queryParams: {
        [entry.key]: null,
      },
      queryParamsHandling: 'merge',
    });
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
