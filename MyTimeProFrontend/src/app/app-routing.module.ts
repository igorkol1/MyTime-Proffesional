import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/commons/login/login.component';
import {ManagerDashboardComponent} from './components/manager/manager-dashboard/manager-dashboard.component';
import {UserDashboardComponent} from './components/user/user-dashboard/user-dashboard.component';
import {LogoutComponent} from './components/commons/logout/logout.component';
import {UserListComponent} from './components/manager/user-list/user-list.component';
import {ProjectListComponent} from './components/manager/project-list/project-list.component';
import {ManagerReportDashboardComponent} from './components/manager/manager-report-dashboard/manager-report-dashboard.component';
import {ActivitiesDashboardComponent} from './components/manager/activities-dashboard/activities-dashboard.component';
import {UserActivitiesDashboardComponent} from './components/user/user-activities-dashboard/user-activities-dashboard.component';
import {UserActivityDailyComponent} from './components/user/user-activity-daily/user-activity-daily.component';
import {ManagerUserActivitiesComponent} from './components/manager/manager-user-activities/manager-user-activities.component';
import {ManagerProjectActivitiesComponent} from './components/manager/manager-project-activities/manager-project-activities.component';
import {UserReportDashboardComponent} from './components/user/user-report-dashboard/user-report-dashboard.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'manager/dashboard', component: ManagerDashboardComponent},
  {path: 'manager/user/list', component: UserListComponent},
  {path: 'manager/project/list', component: ProjectListComponent},
  {path: 'manager/report', component: ManagerReportDashboardComponent},
  {path: 'manager/activities', component: ActivitiesDashboardComponent},
  {path: 'manager/user/activities', component: ManagerUserActivitiesComponent},
  {path: 'manager/project/activities', component: ManagerProjectActivitiesComponent},
  {path: 'user/dashboard', component: UserDashboardComponent},
  {path: 'user/activities', component: UserActivitiesDashboardComponent},
  {path: 'user/activities/daily', component: UserActivityDailyComponent},
  {path: 'user/report', component: UserReportDashboardComponent},
  {path: 'logout', component: LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
