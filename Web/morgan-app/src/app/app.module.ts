import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MorganFiltersComponent } from './morgan-filters/morgan-filters.component';
import { MorganComponent } from './morgan/morgan.component';
import { MorganDetailsComponent } from './morgan-details/morgan-details.component';
import { MorganNavbarComponent } from './morgan-navbar/morgan-navbar.component';
import { MorganSidebarComponent } from './morgan-sidebar/morgan-sidebar.component';
import { MorganIconCardsComponent } from './morgan-icon-cards/morgan-icon-cards.component';
import { MorganChartAreaComponent } from './morgan-chart-area/morgan-chart-area.component';
import { MorganDataTableComponent } from './morgan-data-table/morgan-data-table.component';
import { MorganLoginComponent } from './morgan-login/morgan-login.component';
import { MorganLogoutComponent } from './morgan-logout/morgan-logout.component';
import { MorganForgotPasswordComponent } from './morgan-forgot-password/morgan-forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MorganFiltersComponent,
    MorganComponent,
    MorganDetailsComponent,
    MorganNavbarComponent,
    MorganSidebarComponent,
    MorganIconCardsComponent,
    MorganChartAreaComponent,
    MorganDataTableComponent,
    MorganLoginComponent,
    MorganLogoutComponent,
    MorganForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
