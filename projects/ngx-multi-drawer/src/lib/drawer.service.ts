import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Entry, TransformedEntry } from './drawer.model';
import { EntriesProvider, UrlParamKeysProvider } from './providers';

@Injectable()
export class DrawerService {
  public entriesToRender$: Observable<Entry[]>;

  public closeDrawer$ = new Subject<string>();

  private entriesCache = new Map<string, Entry>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    @Inject(EntriesProvider) public transformedEntries: TransformedEntry[],
    @Inject(UrlParamKeysProvider) urlParamKeys: string[],
  ) {
    console.log('entries', urlParamKeys);
    this.entriesToRender$ = this.activatedRoute.queryParamMap.pipe(
      map((paramMap) => {
          console.log('map', paramMap);
          return paramMap.keys
            .filter(key => urlParamKeys.includes(key))
            .map((key) => this.getEntry(key));
        },
      ),
      map((entries) => entries.sort(({ priority: aPrio = 0 }, { priority: bPrio = 0 }) => aPrio - bPrio)),
    );
  }

  public closeDrawer(drawerKey: string): void {
    this.closeDrawer$.next(drawerKey);
  }

  private getEntry(key: string): Entry {
    const cachedDrawer = this.entriesCache.get(key);

    if (cachedDrawer) {
      return cachedDrawer;
    }

    const transformed = this.transformedEntries.find((entry) => entry.key === key) as TransformedEntry;
    this.entriesCache.set(key, transformed);

    return transformed;
  }
}
