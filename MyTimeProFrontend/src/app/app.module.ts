import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/commons/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ManagerDashboardComponent } from './components/manager/manager-dashboard/manager-dashboard.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { HeaderComponent } from './components/commons/header/header.component';
import { FooterComponent } from './components/commons/footer/footer.component';
import { LogoutComponent } from './components/commons/logout/logout.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { UserListComponent } from './components/manager/user-list/user-list.component';
import { ProjectListComponent } from './components/manager/project-list/project-list.component';
import {TokenInterceptor} from './services/authorization/tokenInterceptor';
import { ManagerReportDashboardComponent } from './components/manager/manager-report-dashboard/manager-report-dashboard.component';
import { NewUserFormComponent } from './components/manager/new-user-form/new-user-form.component';
import { ActivitiesDashboardComponent } from './components/manager/activities-dashboard/activities-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ManagerDashboardComponent,
    UserDashboardComponent,
    HeaderComponent,
    FooterComponent,
    LogoutComponent,
    UserListComponent,
    ProjectListComponent,
    ManagerReportDashboardComponent,
    NewUserFormComponent,
    ActivitiesDashboardComponent
  ],
  entryComponents: [
    NewUserFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
