import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FragmentsService } from './fragments.service';
import { FragmentEntry } from './model';

@Component({
  selector: 'fragments',
  templateUrl: './fragments.component.html',
  styleUrls: ['./fragments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FragmentsService],
})
export class FragmentsComponent implements OnInit {
  public entries: FragmentEntry[] = [];

  constructor(
    private resolver: ComponentFactoryResolver,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    public entriesService: FragmentsService,
  ) {
  }

  public ngOnInit(): void {
    this.entriesService.fragments$.subscribe((entries) => {
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

    this.entriesService.closeDrawer(lastDrawer.key);

  }

  public trackByFn(index: number, entry: FragmentEntry): string {
    return entry.key;
  }
}
