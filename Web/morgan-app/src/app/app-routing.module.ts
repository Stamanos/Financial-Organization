import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Body
import { MorganBodyComponent } from './morgan-body/morgan-body.component';
import { ChartsComponent } from './sidebar/charts/charts.component';
import { DashboardComponent } from './sidebar/dashboard/dashboard.component';
import { FiltersComponent } from './sidebar/filters/filters.component';
import { PagesComponent } from './sidebar/pages/pages.component';
import { TablesComponent } from './sidebar/tables/tables.component';
import { DetailsComponent } from './body/details/details.component';
//Login pages
import { ForgotPasswordComponent } from './login-pages/forgot-password/forgot-password.component';
import { RegisterComponent } from './login-pages/register/register.component';
import { MorganLoginComponent } from './morgan-login/morgan-login.component';

const routes: Routes = [
  { path: '', redirectTo: '/main-body', pathMatch: 'full' },
  { path: 'charts', component: ChartsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'pages', component: PagesComponent },
  { path: 'tables', component: TablesComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'filters', component: FiltersComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: MorganLoginComponent },
  { path: 'main-body', component: MorganBodyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
