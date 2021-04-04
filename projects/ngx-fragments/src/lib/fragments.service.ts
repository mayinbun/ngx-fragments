import { Inject, Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { FragmentsStateService } from './fragments-state.service';
import { FragmentEntry } from './model';
import { FragmentEntriesProvider, FragmentQueryParamKeysProvider } from './providers';

@Injectable()
export class FragmentsService implements OnDestroy {
  public fragments$: Observable<FragmentEntry[]>;

  public closeDrawer$ = new Subject<string>();

  private fragmentsCache = new Map<string, FragmentEntry>();

  private destroy$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    @Inject(FragmentEntriesProvider) private transformedEntries: FragmentEntry[],
    @Inject(FragmentQueryParamKeysProvider) private urlParamKeys: string[],
    private stateService: FragmentsStateService,
  ) {

    this.stateService.state$
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((state) => {
        this.transformedEntries = this.transformedEntries.concat(state);
        this.urlParamKeys = this.urlParamKeys.concat(state.map(entry => entry.key));
      });


    this.fragments$ = this.activatedRoute.queryParamMap.pipe(
      map((paramMap) => {
          return paramMap.keys
            .filter(key => this.urlParamKeys.includes(key))
            .map((key) => this.getEntry(key));
        },
      ),
      map((entries) => entries.sort(({ priority: aPrio = 0 }, { priority: bPrio = 0 }) => aPrio - bPrio)),
    );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
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
