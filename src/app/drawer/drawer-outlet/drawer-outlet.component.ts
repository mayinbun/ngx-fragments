import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  Inject,
  Input,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { DrawerEntry, DrawerOutletContainerProvider } from '../drawer.model';
import { DrawerBaseComponent } from '../drawer-base';

@Component({
  selector: 'app-drawer-outlet',
  templateUrl: './drawer-outlet.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerOutletComponent implements AfterContentInit {
  @ViewChild('viewContainer', {
    read: ViewContainerRef,
    static: true,
  }) public viewContainerRef: ViewContainerRef | undefined;
  @Input() entry: DrawerEntry | undefined;

  public drawerClosed$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private resolver: ComponentFactoryResolver,
    private router: Router,
    @Inject(DrawerOutletContainerProvider) public outletContainer: Type<any>,
  ) {}

  public ngAfterContentInit(): void {
    if (!this.entry || !this.viewContainerRef) {
      return;
    }

    const drawer = this.createDrawer(this.entry, this.viewContainerRef);

    // bind properties to drawer instance
    const drawerKey = this.entry.key;
    drawer.whenClosed$ = this.drawerClosed$.asObservable();
    drawer.whenQueryParamValueChanged$ = this.activatedRoute.queryParamMap.pipe(map(params => params.get(drawerKey)));
  }

  public close(): void {
    if (!this.entry) {
      return;
    }

    this.router.navigate([], {
      queryParams: {
        [this.entry.key]: null,
      },
      queryParamsHandling: 'merge',
    });

    this.drawerClosed$.next();
    this.drawerClosed$.complete();
  }

  private createDrawer(entry: DrawerEntry, viewContainerRef: ViewContainerRef): DrawerBaseComponent {
    const factory = this.resolver.resolveComponentFactory(entry.type);
    const componentRef = viewContainerRef.createComponent(factory);
    return componentRef.instance;
  }
}
