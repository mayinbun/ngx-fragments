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
import { map, takeUntil } from 'rxjs/operators';
import { DrawerEntry } from '../drawer.model';
import { DrawerBaseComponent } from '../drawer-base';

@Component({
  selector: 'app-drawer-outlet',
  templateUrl: './drawer-outlet.component.html',
  styleUrls: ['./drawer-outlet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerOutletComponent implements AfterContentInit, OnDestroy {
  @ViewChild('viewContainer', { read: ViewContainerRef, static: true }) public viewContainerRef: ViewContainerRef | undefined;
  @Input() entry: DrawerEntry | undefined;

  public drawerClosed$ = new Subject<void>();

  private destroy$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private resolver: ComponentFactoryResolver,
    private router: Router,
  ) {
  }

  public ngAfterContentInit(): void {
    if (!this.entry || !this.viewContainerRef) {
      return;
    }

    console.log('rendering...', this.entry.key);

    const drawer = this.createDrawer(this.entry, this.viewContainerRef);

    // bind properties to drawer instance
    const drawerKey = this.entry.key;
    drawer.whenClosed$ = this.drawerClosed$.asObservable();
    drawer.whenQueryParamValueChanged$ = this.activatedRoute.queryParamMap.pipe(map(params => params.get(drawerKey)));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
  }


  private createDrawer(entry: DrawerEntry, viewContainerRef: ViewContainerRef): DrawerBaseComponent {
    const factory = this.resolver.resolveComponentFactory(entry.type);
    const componentRef = viewContainerRef.createComponent(factory);
    const drawer = componentRef.instance;

    return drawer;
  }

  public close(key: string | undefined): void {
    if (!key) {
      return;
    }

    this.router.navigate([], {
      queryParams: {
        [key]: null,
      },
      queryParamsHandling: 'merge',
    });

    this.drawerClosed$.next();
    this.drawerClosed$.complete();
  }
}
