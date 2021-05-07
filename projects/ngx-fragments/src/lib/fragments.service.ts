import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { FragmentsStateService } from './fragments-state.service';
import { FragmentEntryInternal } from './model';

@Injectable()
export class FragmentsService implements OnDestroy {
  public fragments$: Observable<FragmentEntryInternal[]>;
  public closeDrawer$ = new Subject<string>();

  private fragmentsCache = new Map<string, FragmentEntryInternal>();
  private destroy$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private stateService: FragmentsStateService,
  ) {
    this.fragments$ = combineLatest([
      this.stateService.state$,
      this.stateService.fragmentQueryParamKeys$,
      this.activatedRoute.queryParamMap.pipe(map(paramMap => paramMap.keys)),
    ]).pipe(
      takeUntil(this.destroy$),
      map(
        ([state, fragmentQueryParamKeys, urlQueryParamKeys]) => {
          return urlQueryParamKeys
            .filter(key => fragmentQueryParamKeys.includes(key))
            .map(key => this.getFragmentEntry(key, state))
            .sort(({ priority: priorityA = 0 }, { priority: priorityB = 0 }) => priorityA - priorityB);
        },
      ),
    );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
  }

  public closeDrawer(drawerKey: string): void {
    this.closeDrawer$.next(drawerKey);
  }

  private getFragmentEntry(key: string, state: FragmentEntryInternal[]): FragmentEntryInternal {
    const cachedDrawer = this.fragmentsCache.get(key);

    if (cachedDrawer) {
      return cachedDrawer;
    }

    const entry = state.find((e) => e.key === key) as FragmentEntryInternal;
    this.fragmentsCache.set(key, entry);

    return entry;
  }
}
