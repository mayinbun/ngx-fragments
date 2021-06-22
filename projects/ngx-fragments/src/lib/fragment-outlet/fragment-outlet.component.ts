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
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, first, map, takeUntil } from 'rxjs/operators';
import { FragmentsService } from '../fragments.service';
import { FragmentEntryInternal } from '../model';
import { FragmentOutletBase } from './fragment-outlet-base';

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
  public isFirstFragment$: Observable<boolean> | undefined;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private resolver: ComponentFactoryResolver,
    private fragmentsService: FragmentsService,
  ) {}

  public ngAfterContentInit(): void {
    if (!this.entry || !this.viewContainerRef) {
      return;
    }
    const currentEntryKey = this.entry.key;

    this.isFirstFragment$ = this.fragmentsService.fragments$.pipe(
      map(state => state[0]?.key === currentEntryKey),
      takeUntil(this.unsubscribe$),
    );

    // listen to close events from service
    this.fragmentsService.closeFragment$.pipe(
      first(),
      filter(key => key === currentEntryKey),
      takeUntil(this.unsubscribe$)
    ).subscribe(() => this.close());

    const cmp = this.createComponentFromEntryType(this.entry, this.viewContainerRef);

    // FragmentOutlet Props
    cmp.queryParamValue = this.activatedRoute.snapshot.queryParamMap.get(currentEntryKey);
    cmp.whenClosed$ = this.whenClosed.asObservable();
    cmp.whenQueryParamValueChanged$ = this.activatedRoute.queryParamMap.pipe(
      map(params => params.get(currentEntryKey)),
      filter(Boolean)
    );
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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
