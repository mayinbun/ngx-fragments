import { ModuleWithProviders, NgModule } from '@angular/core';
import { DrawerComponent } from './drawer.component';
import { CommonModule } from '@angular/common';
import { DrawerOutletComponent } from './drawer-outlet/drawer-outlet.component';
import { DrawerEntriesProvider, DrawerEntry, DrawerKeysProvider } from './drawer.model';

@NgModule({
  exports: [
    DrawerComponent,
  ],
  declarations: [
    DrawerComponent,
    DrawerOutletComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class DrawerModule {
  public static forRoot(drawerEntries: DrawerEntry[]): ModuleWithProviders<DrawerModule> {
    return {
      ngModule: DrawerModule,
      providers: [
        {
          provide: DrawerEntriesProvider,
          useValue: drawerEntries,
        },
        {
          provide: DrawerKeysProvider,
          useValue: drawerEntries.map(e => e.key),
        },
      ],
    };
  }
}
