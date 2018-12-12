import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { CommonModule } from '@angular/common';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MorganDetailsComponent } from './morgan-details/morgan-details.component';
import { MorganNavbarComponent } from './morgan-navbar/morgan-navbar.component';
import { MorganSidebarComponent } from './morgan-sidebar/morgan-sidebar.component';
import { MorganIconCardsComponent } from './body/icon-cards/icon-cards.component';
import { MorganChartAreaComponent } from './body/chart-area/chart-area.component';
import { MorganDataTableComponent } from './body/data-table/data-table.component';
import { MorganLoginComponent } from './morgan-login/morgan-login.component';
import { MorganBodyComponent } from './morgan-body/morgan-body.component';
import { DashboardComponent } from './sidebar/dashboard/dashboard.component';
import { PagesComponent } from './sidebar/pages/pages.component';
import { ChartsComponent } from './sidebar/charts/charts.component';
import { TablesComponent } from './sidebar/tables/tables.component';
import { MorganFiltersComponent } from './sidebar/filters/filters.component';
import { NotificationsComponent } from './navbar/notifications/notifications.component';
import { MessagesComponent } from './navbar/messages/messages.component';
import { ProfileComponent } from './navbar/profile/profile.component';
import { SearchForComponent } from './navbar/search-for/search-for.component';
import { RegisterComponent } from './login-pages/register/register.component';
import { ForgotPasswordComponent } from './login-pages/forgot-password/forgot-password.component';
import { Error404Component } from './secondary-pages/error404/error404.component';
import { BlankComponent } from './secondary-pages/blank/blank.component';

@NgModule({
  declarations: [
    AppComponent,
    MorganFiltersComponent,
    MorganDetailsComponent,
    MorganNavbarComponent,
    MorganSidebarComponent,
    MorganIconCardsComponent,
    MorganChartAreaComponent,
    MorganDataTableComponent,
    MorganLoginComponent,
    MorganBodyComponent,
    PagesComponent,
    ChartsComponent,
    TablesComponent,
    DashboardComponent,
    NotificationsComponent,
    MessagesComponent,
    ProfileComponent,
    SearchForComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    Error404Component,
    BlankComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
