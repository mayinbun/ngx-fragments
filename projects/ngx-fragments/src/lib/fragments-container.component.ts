import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FragmentsService } from './fragments.service';
import { FragmentEntryInternal } from './model';

@Component({
  selector: 'ngx-fragments',
  templateUrl: './fragments-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FragmentsService],
})
export class FragmentsContainerComponent implements OnInit {
  public entries: FragmentEntryInternal[] = [];

  constructor(
    private resolver: ComponentFactoryResolver,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    public fragmentsService: FragmentsService,
  ) {}

  public ngOnInit(): void {
    this.fragmentsService.fragments$.subscribe((entries) => {
      this.entries = entries;
      this.changeDetectorRef.markForCheck();
    });
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