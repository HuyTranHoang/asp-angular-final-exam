import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { TestErrorComponent } from './test-error/test-error.component'
import { NotFoundComponent } from './test-error/not-found/not-found.component'
import { ServerErrorComponent } from './test-error/server-error/server-error.component'

const routes: Routes = [
  {path: '', component: HomeComponent, data: {breadcrumb: 'Trang chủ'}},
  {path: 'shop', loadChildren: () => import('./shop/shop.module').then(mod => mod.ShopModule)},
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule)},
  {path: 'test-error', component: TestErrorComponent},
  {path: 'test-error/not-found', component: NotFoundComponent},
  {path: 'test-error/server-error', component: ServerErrorComponent},
  {path: '**', redirectTo: '/', pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
