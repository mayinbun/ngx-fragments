import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  Input,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, takeUntil } from 'rxjs/operators';
import { FragmentsService } from '../fragments.service';
import { FragmentOutletBase } from './fragment-outlet-base';
import { FragmentEntryInternal } from '../model';

@Component({
  selector: 'fragment-outlet',
  templateUrl: './fragment-outlet.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FragmentOutletComponent implements OnDestroy, AfterContentInit {
  @ViewChild('viewContainer', {
    read: ViewContainerRef,
    static: true,
  }) public viewContainerRef: ViewContainerRef | undefined;
  @Input() entry: FragmentEntryInternal | undefined;

  public whenClosed = new Subject<void>();

  private destroy$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private resolver: ComponentFactoryResolver,
    private entriesService: FragmentsService,
  ) {
  }

  public ngAfterContentInit(): void {
    if (!this.entry || !this.viewContainerRef) {
      return;
    }

    const currentEntryKey = this.entry.key;

    // listen to close events from service
    this.entriesService.closeDrawer$.pipe(
      takeUntil(this.destroy$),
      filter(key => key === currentEntryKey),
    ).subscribe(() => this.close());

    const cmp = this.createComponentFromEntryType(this.entry, this.viewContainerRef);

    // bind properties to drawer instance
    cmp.whenClosed$ = this.whenClosed.asObservable();
    cmp.whenQueryParamValueChanged$ = this.activatedRoute.queryParamMap.pipe(map(params => params.get(currentEntryKey)));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
  }

  public close(): void {
    if (!this.entry) {
      return;
    }

    this.whenClosed.next();
    this.whenClosed.complete();

    this.router.navigate([], {
      queryParams: {
        [this.entry.key]: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  private createComponentFromEntryType(entry: FragmentEntryInternal, viewContainerRef: ViewContainerRef): FragmentOutletBase {
    const factory = this.resolver.resolveComponentFactory(entry.type);
    const componentRef = viewContainerRef.createComponent(factory);
    return componentRef.instance;
  }
}
