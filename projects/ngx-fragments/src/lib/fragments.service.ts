import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { FragmentEntry } from './model';
import { FragmentEntriesProvider, FragmentQueryParamKeysProvider } from './providers';

@Injectable()
export class FragmentsService {
  public fragments$: Observable<FragmentEntry[]>;

  public closeDrawer$ = new Subject<string>();

  private fragmentsCache = new Map<string, FragmentEntry>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    @Inject(FragmentEntriesProvider) public transformedEntries: FragmentEntry[],
    @Inject(FragmentQueryParamKeysProvider) urlParamKeys: string[],
  ) {
    this.fragments$ = this.activatedRoute.queryParamMap.pipe(
      map((paramMap) => {
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

  private getEntry(key: string): FragmentEntry {
    const cachedDrawer = this.fragmentsCache.get(key);

    if (cachedDrawer) {
      return cachedDrawer;
    }

    const transformed = this.transformedEntries.find((entry) => entry.key === key) as FragmentEntry;
    this.fragmentsCache.set(key, transformed);

    return transformed;
  }
}
