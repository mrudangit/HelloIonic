import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {FxTilesComponent} from './fx.tiles/fx.tiles.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Tiles',
    pathMatch: 'full'
  },
  {
    path: 'folder/Tiles',
    component: FxTilesComponent
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
