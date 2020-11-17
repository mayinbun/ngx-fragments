import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DrawerService } from './drawer.service';
import { DrawerEntry } from './drawer.model';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DrawerService],
})
export class DrawerComponent implements OnInit {
  public entries: DrawerEntry[] = [];

  constructor(
    private resolver: ComponentFactoryResolver,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    public drawerService: DrawerService,
  ) {
  }

  ngOnInit(): void {
    this.drawerService.entriesToRender$.subscribe((entries) => {
      this.entries = entries;
      this.changeDetectorRef.markForCheck();
    });
  }

  public trackByFn(index: number, entry: DrawerEntry): string {
    return entry.key;
  }
}
