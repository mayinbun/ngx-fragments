import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FragmentsService } from './fragments.service';
import { FragmentEntryInternal } from './model';

@Component({
  selector: 'ngx-fragments',
  templateUrl: './fragments-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FragmentsService],
})
export class FragmentsContainerComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();

  public entries: FragmentEntryInternal[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private fragmentsService: FragmentsService,
  ) {}

  public ngOnInit(): void {
    this.fragmentsService.fragments$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((entries) => {
        this.entries = entries;
        this.changeDetectorRef.detectChanges();
      });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  @HostListener('document:keydown.esc')
  public onEscape(): void {
    const lastDrawer = this.entries[this.entries.length - 1];

    if (!lastDrawer) {
      return;
    }

    this.fragmentsService.closeFragment(lastDrawer.key);
  }

  public trackByFn(index: number, entry: FragmentEntryInternal): string {
    return entry.key;
  }
}
