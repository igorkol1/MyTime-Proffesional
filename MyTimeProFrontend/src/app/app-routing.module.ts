import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/commons/login/login.component';
import {ManagerDashboardComponent} from './components/manager/manager-dashboard/manager-dashboard.component';
import {UserDashboardComponent} from './components/user/user-dashboard/user-dashboard.component';
import {LogoutComponent} from './components/commons/logout/logout.component';
import {UserListComponent} from './components/manager/user-list/user-list.component';
import {ProjectListComponent} from './components/manager/project-list/project-list.component';
import {ManagerReportDashboardComponent} from './components/manager/manager-report-dashboard/manager-report-dashboard.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'manager/dashboard', component: ManagerDashboardComponent},
  {path: 'manager/user/list', component: UserListComponent},
  {path: 'manager/project/list', component: ProjectListComponent},
  {path: 'manager/report', component: ManagerReportDashboardComponent},
  {path: 'user/dashboard', component: UserDashboardComponent},
  {path: 'logout', component: LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
