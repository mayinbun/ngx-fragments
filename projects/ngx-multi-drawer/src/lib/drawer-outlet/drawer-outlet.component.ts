import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  Inject,
  Input,
  OnDestroy,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, takeUntil } from 'rxjs/operators';
import { DrawerEntry } from '../drawer.model';
import { DrawerService } from '../drawer.service';
import { DrawerOutletContainerProvider } from './drawer-outlet-container.component';
import { DrawerOutletBase } from './drawer-outlet-base';

@Component({
  selector: 'lib-drawer-outlet',
  templateUrl: './drawer-outlet.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerOutletComponent implements OnDestroy, AfterContentInit {
  @ViewChild('viewContainer', {
    read: ViewContainerRef,
    static: true,
  }) public viewContainerRef: ViewContainerRef | undefined;
  @Input() entry: DrawerEntry | undefined;

  public drawerClosed$ = new Subject<void>();

  private destroy$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private resolver: ComponentFactoryResolver,
    private drawerService: DrawerService,
    @Inject(DrawerOutletContainerProvider) public outletContainer: Type<any>,
  ) {
  }

  public ngAfterContentInit(): void {
    if (!this.entry || !this.viewContainerRef) {
      return;
    }

    const currentDrawerKey = this.entry.key;

    this.drawerService.closeDrawer$.pipe(
      takeUntil(this.destroy$),
      filter(key => key === currentDrawerKey),
    ).subscribe(() => this.close());

    const drawer = this.createDrawer(this.entry, this.viewContainerRef);

    // bind properties to drawer instance
    drawer.whenClosed$ = this.drawerClosed$.asObservable();
    drawer.whenQueryParamValueChanged$ = this.activatedRoute.queryParamMap.pipe(map(params => params.get(currentDrawerKey)));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
  }

  public close(): void {
    if (!this.entry) {
      return;
    }

    this.drawerClosed$.next();
    this.drawerClosed$.complete();

    this.router.navigate([], {
      queryParams: {
        [this.entry.key]: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  private createDrawer(entry: DrawerEntry, viewContainerRef: ViewContainerRef): DrawerOutletBase {
    const factory = this.resolver.resolveComponentFactory(entry.type);
    const componentRef = viewContainerRef.createComponent(factory);
    return componentRef.instance;
  }
}
