import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FragmentEntry } from './model';

@Injectable({
  providedIn: 'root',
})
export class FragmentsStateService {

  public state$ = new Subject<FragmentEntry[]>();

  public setState(state: FragmentEntry[]): void {
    this.state$.next(
      state,
    );
  }
}
