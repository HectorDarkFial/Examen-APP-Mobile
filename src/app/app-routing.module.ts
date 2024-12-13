import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./Pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'despacho',
    loadChildren: () => import('./Pages/despacho/despacho.module').then( m => m.DespachoPageModule)
  },
  {
    path: 'ingreso',
    loadChildren: () => import('./Pages/ingreso/ingreso.module').then( m => m.IngresoPageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./Pages/historial/historial.module').then( m => m.HistorialPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
