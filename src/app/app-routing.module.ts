import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'lazy-feature',
    loadChildren: () => import('./lazy-feature/lazy-feature.module').then(m => m.LazyFeatureModule),
  },
  {
    path: 'another-lazy',
    loadChildren: () => import('./another-lazy/another-lazy.module').then(m => m.AnotherLazyModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
