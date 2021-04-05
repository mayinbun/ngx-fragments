import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FragmentEntry } from './model';
import { FragmentEntriesProvider } from './providers';
import { getFragmentEntryKeys } from './util';

@Injectable({
  providedIn: 'root',
})
export class FragmentsStateService {
  public state$: BehaviorSubject<FragmentEntry[]>;
  public fragmentQueryParamKeys$: BehaviorSubject<string[]>;

  constructor(
    @Inject(FragmentEntriesProvider) private rootFragments: FragmentEntry[],
  ) {
    this.state$ = new BehaviorSubject<FragmentEntry[]>(rootFragments ?? []);
    this.fragmentQueryParamKeys$ = new BehaviorSubject<string[]>(
      getFragmentEntryKeys(rootFragments),
    );
  }

  public extendRootFragments(featureFragments?: FragmentEntry[]): void {
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
