import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/commons/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ManagerDashboardComponent} from './components/manager/manager-dashboard/manager-dashboard.component';
import {UserDashboardComponent} from './components/user/user-dashboard/user-dashboard.component';
import {HeaderComponent} from './components/commons/header/header.component';
import {FooterComponent} from './components/commons/footer/footer.component';
import {LogoutComponent} from './components/commons/logout/logout.component';
import {NgbDateAdapter, NgbDateNativeAdapter, NgbDropdown, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {UserListComponent} from './components/manager/user-list/user-list.component';
import {ProjectListComponent} from './components/manager/project-list/project-list.component';
import {TokenInterceptor} from './services/authorization/tokenInterceptor';
import {ManagerReportDashboardComponent} from './components/manager/manager-report-dashboard/manager-report-dashboard.component';
import {NewUserFormComponent} from './components/manager/new-user-form/new-user-form.component';
import {ActivitiesDashboardComponent} from './components/manager/activities-dashboard/activities-dashboard.component';
import {ProjectFormComponent} from './components/manager/project-form/project-form.component';
import {UserActivitiesDashboardComponent} from './components/user/user-activities-dashboard/user-activities-dashboard.component';
import {ActivityFormComponent} from './components/commons/activity-components/activity-form/activity-form.component';
import {ActivityListComponent} from './components/commons/activity-components/activity-list/activity-list.component';
import {UserActivityDailyComponent} from './components/user/user-activity-daily/user-activity-daily.component';
import { ManagerUserActivitiesComponent } from './components/manager/manager-user-activities/manager-user-activities.component';
import { ManagerProjectActivitiesComponent } from './components/manager/manager-project-activities/manager-project-activities.component';
import { UserReportDashboardComponent } from './components/user/user-report-dashboard/user-report-dashboard.component';
import { UserActivityCloneComponent } from './components/user/user-activity-clone/user-activity-clone.component';
import { UserActivityCalendarComponent } from './components/user/user-activity-calendar/user-activity-calendar.component';
import { CalendarDayComponent } from './components/commons/calendar/calendar-day/calendar-day.component';
import { CalendarComponent } from './components/commons/calendar/calendar.component';
import { UserWebReportComponent } from './components/user/user-web-report/user-web-report.component';
import { UserReportComponent } from './components/user/user-web-report/user-report/user-report.component';

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
    ActivitiesDashboardComponent,
    ProjectFormComponent,
    UserActivitiesDashboardComponent,
    ActivityFormComponent,
    ActivityListComponent,
    UserActivityDailyComponent,
    ManagerUserActivitiesComponent,
    ManagerProjectActivitiesComponent,
    UserReportDashboardComponent,
    UserActivityCloneComponent,
    UserActivityCalendarComponent,
    CalendarDayComponent,
    CalendarComponent,
    UserWebReportComponent,
    UserReportComponent
  ],
  entryComponents: [
    NewUserFormComponent,
    ProjectFormComponent,
    ActivityFormComponent,
    UserActivityCloneComponent
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
