import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FragmentEntryInternal } from './model';
import { FragmentEntriesProvider } from './providers';
import { getFragmentEntryKeys } from './util';

@Injectable({
  providedIn: 'root',
})
export class FragmentsStateService {
  public state$: BehaviorSubject<FragmentEntryInternal[]>;
  public fragmentQueryParamKeys$: BehaviorSubject<string[]>;

  constructor(
    @Inject(FragmentEntriesProvider) private rootFragments: FragmentEntryInternal[],
  ) {
    this.state$ = new BehaviorSubject<FragmentEntryInternal[]>(rootFragments ?? []);
    this.fragmentQueryParamKeys$ = new BehaviorSubject<string[]>(
      getFragmentEntryKeys(rootFragments),
    );
  }

  public extendRootFragments(featureFragments?: FragmentEntryInternal[]): void {
    this.state$.next([
      ...this.state$.getValue(),
      ...(featureFragments || []),
    ]);
  }

  public extendRootFragmentQueryParamKeys(keys?: string[]): void {
    this.fragmentQueryParamKeys$.next([
      ...this.fragmentQueryParamKeys$.getValue(),
      ...(keys || []),
    ]);
  }
}
